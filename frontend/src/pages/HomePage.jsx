import React, { useEffect, useState } from 'react'
import { UserButton } from '@clerk/clerk-react'
import { useSearchParams } from "react-router"
import { useStreamChat } from '../hooks/useStreamChat'
import PageLoader from '../components/PageLoader'
import "../styles/stream-chat-theme.css"
import { Chat, Channel, ChannelList, MessageList, Thread, Window, MessageInput} from "stream-chat-react"
import { PlusIcon } from 'lucide-react'
import CreateChannelModal from '../components/CreateChannelModal.jsx'

const HomePage = () => {

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [activeChannel, setActiveChannel] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const {chatClient, isLoading, error} = useStreamChat()

    useEffect(() => {
        if(chatClient){
            const channelId = searchParams.get("channel")
            if(channelId){
                const channel = chatClient.channel("messaging", channelId)
                setActiveChannel(channel)
            }
        }
    }, [chatClient, searchParams])

    // Handle loading and error states
    if(error) return <p>Something went wrong</p>
    if(isLoading || !chatClient) return <PageLoader/>

    return (
        <>
        <div className='chat-wrapper'>
            <Chat client={chatClient}>
                <div className='chat-container'>
                    {/* Left sidebar */}
                    <div className='str-chat_channel-list'>
                        <div className='team-channel-list'>
                            {/* Header  */}
                            <div className='team-channel-list_header gap-4'>
                                <div className='brand-container'>
                                    <img src="/logo.png" alt="Logo" className='brand-logo' />
                                    <span className='brand-name'>Slack</span>
                                </div>
                                <div className='user-button-wrapper'>
                                    <UserButton  />
                                </div>
                            </div>
                            {/* Channel List */}
                            <div className="team-channel-list_content">
                                <div className="create-channel-section">
                                    <button onClick={() => setIsCreateModalOpen(true)} className='create-channel-btn'>
                                        <PlusIcon className='size-4' />
                                        <span>Create Channel</span>
                                    </button>
                                </div>
                                {/* Channel List */}

                            </div>
                        </div>
                    </div>
                    {/* Right Container */}
                    <div className="chat-main">
                        <Channel channel={activeChannel}>
                            <Window>
                                {/* <CustomChannelHeader /> */}
                                <MessageList />
                                <MessageInput focus={true} />
                            </Window>
                            <Thread />
                        </Channel>
                    </div>
                </div>
                {isCreateModalOpen && (
                    <CreateChannelModal
                        // isOpen={isCreateModalOpen}
                        onClose={() => setIsCreateModalOpen(false)}
                    />    
                )}
            </Chat>
        </div>
        </>
    )
}

export default HomePage
