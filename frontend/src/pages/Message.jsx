import React from "react";
import Navbar from "../components/Navbar";

const Message = () => {
  return (
    <>
      <div className="w-full md:max-w-2xl lg:max-w-3xl h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 overflow-y-auto px-2 py-4">
          {/* Chat messages */}
          <p className="text-center text-gray-400">Start chatting...</p>
        </div>
        {/* Input */}
        <div className="fixed bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-3 w-[95%] sm:w-[80%] md:w-[70%] lg:w-[50%]">
          <div className="flex items-center gap-3 border p-2 rounded-full w-full bg-gray-800">
            <input
              type="text"
              placeholder="Send a message"
              className="outline-none w-full bg-transparent text-sm sm:text-base"
            />
            <img
              src="./chat-app-assets/gallery_icon.svg"
              alt="gallery_icon.svg"
              className="w-5 cursor-pointer"
            />
          </div>
          <img
            src="./chat-app-assets/send_button.svg"
            alt="send_button.svg"
            className="w-8 cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default Message;
