import {React,useEffect, useRef } from 'react'
import {useChatStore} from '../store/useChatStore'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utils';
const ChatContainer = () => {
  const {messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages,unsubscribeFromMessages}=useChatStore();
  const {authUser} = useAuthStore();
  const messageEndRef= useRef(null);



useEffect(() => {
  if (selectedUser?._id) {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => {
      unsubscribeFromMessages();
    };
  }
}, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);


useEffect(() => {
  if (messageEndRef.current && messages) {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }}, [messages]);

  if(isMessagesLoading) return (
    
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>
      <MessageSkeleton/>
      <MessageInput/>

      
    </div>
  )
  
  return (
<div className='flex-1 space-y-4 p-4 overflow-y-auto max-h-[calc(100vh-100px)]'>
    <ChatHeader/>
    <div className='flex-1 space-y-4 p-4 overflow-y-auto'>
      {messages.map((message)=>(
        <div
          key={message._id}
          className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}
          ref={messageEndRef}
        >
        <div className='chat-image avatar'>
          <div className='size-10 border rounded-full'>
            <img 
            src=
            {message.senderId === authUser._id 
            ? authUser.profilePic || "/avatar.png" 
            : selectedUser.profilePic || "/avatar.png" 
          } 
            alt="profile pic"
          />
          </div>
        </div>
        <div className='chat-header mb-1'>
          <time className='text-xs opacity-50 ml-1'>{formatMessageTime(message.createdAt)}</time>
        </div>
        <div className={`chat-bubble flex flex-col ${message.senderId === authUser._id ? 'bg-primary text-primary-content' : 'bg-base-200'}`}>
          {message.image && (
            <img
            src = {message.image}
            alt="attachment"
            className='sm:max-w-[200px] rounded-md mb-2'
          />
          )}
          {message.text && <p>{message.text}</p>}
          
        </div>
        </div>
      ))}
      
      </div>
    <MessageInput/>
    
    </div>
  )
}

export default ChatContainer