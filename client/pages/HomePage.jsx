import React from 'react'
import {useChatStore} from '../src/store/useChatStore'
import Sidebar from '../src/Components/Sidebar';
import NoChatSelected from '../src/Components/NoChatSelected';
import ChatContainer from '../src/Components/ChatContainer';

const HomePage = () => {
  const {selectedUser} = useChatStore();
  return (
    <div className='h-screen bg-base-200'>
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem0)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar/>
            {!selectedUser? <NoChatSelected/> : <ChatContainer/>}
          </div>
        </div>
      </div>

    </div>
  )
}

export default HomePage