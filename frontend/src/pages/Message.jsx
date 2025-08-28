import { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "../components/Navbar";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
  query: { userId: localStorage.getItem("id") },
});

const Message = ({ selectedUser }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const id = localStorage.getItem("id");
  const messagesEndRef = useRef(null);

  // Skrollni pastga tushirish
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Backenddan eski xabarlarni olish
  const getMessages = useCallback(async () => {
    if (!selectedUser?._id) return;
    try {
      const { data } = await axiosInstance.get(`/messages/${selectedUser._id}`);
      setMessages(data);
      scrollToBottom();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error fetching messages");
    }
  }, [selectedUser?._id]);

  // Xabar yuborish
  const handleMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await axiosInstance.post(`/messages/send`, {
        receiverId: selectedUser?._id,
        text,
      });
      setText("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error sending message");
    }
  };

  // Socket orqali yangi xabar olish
  useEffect(() => {
    socket.on("newMessage", (newMsg) => {
      if (
        newMsg.senderId === selectedUser?._id ||
        newMsg.receiverId === selectedUser?._id
      ) {
        setMessages((prev) => [...prev, newMsg]);
        scrollToBottom();
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [selectedUser?._id]);

  // Eski xabarlarni olish
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
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-2 py-4">
        {messages.map((message, index) => {
          const sender =
            typeof message.senderId === "object"
              ? message.senderId._id
              : message.senderId;
          return (
            <div
              key={index}
              className={`mb-2 flex ${
                sender === id ? "justify-end" : "justify-start"
              }`}
            >
              <p
                className={`px-3 py-2 rounded-lg ${
                  sender === id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-200"
                }`}
              >
                {message?.text}
              </p>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleMessage}
        className="fixed bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-3 w-[95%] sm:w-[80%] md:w-[70%] lg:w-[50%]"
      >
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
        <button type="submit">
          <img
            src="./chat-app-assets/send_button.svg"
            alt="send_button.svg"
            className="w-8 cursor-pointer"
          />
        </button>
      </form>
    </div>
  );
};

export default Message;
