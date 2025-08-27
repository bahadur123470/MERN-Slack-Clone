import { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api"; // no .js needed
import * as Sentry from "@sentry/react";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

/**
 * Hook: useStreamChat
 *
 * Connects the current Clerk user to Stream Chat API.
 * Handles:
 *  - fetching a Stream token with react-query
 *  - connecting the user to Stream
 *  - setting the chat client state
 *  - disconnecting on cleanup
 */
export const useStreamChat = () => {
    const { user } = useUser();
    const [chatClient, setChatClient] = useState(null);

    // Fetch Stream token with react-query
    const {
        data: tokenData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["streamToken"],
        queryFn: getStreamToken,
        enabled: !!user?.id, // run query only if user is logged in
    });

    // Initialize Stream Chat client
    useEffect(() => {
        if (!tokenData?.token || !user?.id || !STREAM_API_KEY) return;

        const client = StreamChat.getInstance(STREAM_API_KEY);
        let cancelled = false;

        const connect = async () => {
        try {
            await client.connectUser({
                id: user.id,
                name:
                user.fullName ??
                user.username ??
                user.primaryEmailAddress?.emailAddress ??
                user.id,
                image: user.imageUrl ?? undefined,
            },
            tokenData.token
            );

            if (!cancelled) {
            setChatClient(client);
            }
        } catch (err) {
            console.error("Error connecting to Stream Chat:", err);
            Sentry.captureException(err, {
            tags: { component: "useStreamChat" },
            extra: {
                context: "stream_chat_connection",
                userId: user?.id,
                streamApiKey: STREAM_API_KEY ? "present" : "missing",
            },
            });
        }
        };

        connect();

        // Cleanup when user/token changes or component unmounts
        return () => {
            cancelled = true;
            client.disconnectUser();
        };
    }, [tokenData?.token, user?.id]);

    return { chatClient, isLoading, error };
};
