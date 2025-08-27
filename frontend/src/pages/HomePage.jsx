import { useEffect, useState } from "react";
import CreateChannelModal from "../components/CreateChannelModal";
import CustomChannelPreview from "../components/CustomChannelPreview";
import UsersList from "../components/UsersList";
// import CustomChannelHeader from "../components/CustomChannelHeader";
import { Channel, ChannelHeader, ChannelList, Chat, MessageInput, MessageList, Thread, Window, useChatContext, } from "stream-chat-react";

const HomePage = ({ chatClient }) => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        if (!chatClient) return;
    }, [chatClient]);

    if (!chatClient) return <p>Loading...</p>;
    if (error) return <p>Something went wrong...</p>;

    return (
    <Chat client={chatClient} theme="team dark">
        <div className="app-wrapper">
            {/* Sidebar */}
            <div className="str-chat__channel-list">
                <div className="team-channel-list__header">
                    <span className="brand-name">Slack</span>
                </div>

                {/* Channel List */}
                <ChannelList
                filters={{ members: { $in: [chatClient?.user?.id] } }}
                Preview={(props) => (
                <CustomChannelPreview
                {...props}
                onCreateChannel={() => setIsCreateModalOpen(true)}
                />
                )}
                />

                {/* Users List */}
                <UsersList onCreateChannel={() => setIsCreateModalOpen(true)} />
            </div>
            {/* Chat Window */}
            {/* <Channel>
                <Window>
                    <CustomChannelHeader />
                    <MessageList />
                    <MessageInput focus={true} />
                </Window>
                <Thread />
            </Channel> */}
        </div>

        {/* Create Channel Modal */}
        {isCreateModalOpen && (
            <CreateChannelModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            />
        )}
    </Chat>
    );
};

export default HomePage;
