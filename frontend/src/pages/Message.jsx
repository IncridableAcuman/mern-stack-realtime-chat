import React from 'react'
import Navbar from '../components/Navbar'

const Message = () => {
  return (
    <>
    <div className="w-full max-w-3xl h-screen">
      <Navbar/>
      <div className="">
        a
      </div>
      <div className="fixed bottom-2 flex items-center justify-between gap-3 w-[50%]">
            <div className="flex items-center gap-3 border p-2 rounded-full w-full">
              <input type="text" placeholder='Send a message' className='outline-none w-full' />
              <img src="./chat-app-assets/gallery_icon.svg" alt="gallery_icon.svg" className='w-5 cursor-pointer' />
            </div>
              <img src="./chat-app-assets/send_button.svg" alt="send_button.svg" className='w-8 cursor-pointer' />
          </div>
    </div>
    </>
  )
}

export default Message