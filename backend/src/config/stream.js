import { StreamChat } from "stream-chat"
import { ENV } from "./env.js"

const streamClient = StreamChat.getInstance(
    ENV.STREAM_API_KEY,
    ENV.STREAM_API_SECRET
); 

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUser(userData)
        console.log("Stream user upserted successfully:", userData.name)
        return userData
    } catch (error) {
        console.log("Error upserting stream user", error);
        throw error; // Throw the error after logging it
    }
};

export const deleteStreamUser = async (userId) => {
    try {
        await streamClient.deleteUser(userId)
        console.log("Stream user deleted successfully:", userId)
    } catch (error) {
        console.log("Error deleting stream user", error);
        throw error; // Throw the error after logging it
    }
};

export const generateStreamToken = (userId) => {
    try {
        const userIdString = userId.toString()
        return streamClient.createToken(userIdString);
    } catch (error) {
        console.log("Error generating stream token", error)
        return null;
    }
};

export const addUserToPublicChannels = async (newUserId) => {
    const publicChannels = await streamClient.queryChannels({ discoverable: true });
    for (const channel of publicChannels) {
    await channel.addMembers([newUserId]);
    }
};