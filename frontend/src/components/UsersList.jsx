import { useQuery } from "@tanstack/react-query";
import { Avatar, useChatContext } from "stream-chat-react";
import * as Sentry from "@sentry/react";
import { CircleIcon } from "lucide-react";

const UsersList = () => {
    const { client, setActiveChannel } = useChatContext();

    const { data: users, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
        const response = await client.queryUsers({});
        return response.users.filter(
            user => !user.id.startsWith("recording-")
        );
        },
        staleTime: 1000 * 60 * 5,
    });

    const startDirectMessage = async user => {
        try {
        const channelId = `dm-${[client.user.id, user.id].sort().join("-")}`.slice(
            0,
            64
        );
        const channel = client.channel("messaging", channelId, {
            members: [client.user.id, user.id],
        });
        await channel.watch();
        setActiveChannel(channel);
        } catch (error) {
        console.error("Error starting DM:", error);
        Sentry.captureException(error);
        }
    };

    if (isLoading) return <div>Loading users...</div>;
    if (!users?.length) return <div>No users found</div>;

    return (
    <div className="p-4">
        <h3 className="mb-4 text-lg font-bold">Users</h3>
        <div className="space-y-2">
            {users.map(user => (
            <button
                key={user.id}
                onClick={() => startDirectMessage(user)}
                className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
                <Avatar
                image={user.image}
                name={user.name || user.id}
                size={40}
                shape="circle"
                />
                <div className="ml-3 flex-1 text-left">
                <div className="font-medium">
                    {user.name || user.id}
                </div>
                <div className="text-sm text-gray-500 flex items-center">
                    <CircleIcon
                    className={`w-2 h-2 mr-1 ${
                        user.online ? "text-green-500" : "text-gray-400"
                    }`}
                    />
                    {user.online ? "Online" : "Offline"}
                </div>
                </div>
                {user.unreadCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {user.unreadCount}
                </span>
                )}
            </button>
            ))}
        </div>
    </div>
    );
};

export default UsersList;
