import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

const Message = ({ selectedUser }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const id = localStorage.getItem("id");

  const getMessages = useCallback(async () => {
    if (!selectedUser?._id) return;
    try {
      const { data } = await axiosInstance.get(`/messages/${selectedUser._id}`);
      setMessages(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error");
    }
  }, [selectedUser?._id]);

  const handleMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return; // bo'sh yuborishni oldini olish
    try {
      await axiosInstance.post(`/messages/send`, {
        senderId: id,
        receiverId: selectedUser?._id,
        text,
      });
      setText(""); // inputni tozalash
      getMessages(); // yangi xabarlarni olish
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error");
      console.error(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  if (!selectedUser) {
    return (
      <div className="w-full md:max-w-2xl lg:max-w-3xl h-screen flex flex-col justify-center items-center">
        <p className="text-center text-gray-400">User tanlang...</p>
      </div>
    );
  }

  return (
    <div className="w-full md:max-w-2xl lg:max-w-3xl h-screen flex flex-col">
      <Navbar selectedUser={selectedUser} />
      <div className="flex-1 overflow-y-auto px-2 py-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 flex ${
              message?.senderId === id ? "justify-end" : "justify-start"
            }`}
          >
            <p
              className={`px-3 py-2 rounded-lg ${
                message?.senderId === id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-200"
              }`}
            >
              {message?.text}
            </p>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-3 w-[95%] sm:w-[80%] md:w-[70%] lg:w-[50%]">
        <div className="flex items-center gap-3 border p-2 rounded-full w-full bg-gray-800">
          <input
            type="text"
            placeholder="Send a message"
            className="outline-none w-full bg-transparent text-sm sm:text-base"
            value={text}
            onChange={(e) => setText(e.target.value)}
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
          onClick={handleMessage}
        />
      </div>
    </div>
  );
};

export default Message;
