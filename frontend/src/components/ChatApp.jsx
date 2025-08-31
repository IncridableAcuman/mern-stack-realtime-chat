import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";


export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [usersList, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(usersList[0]);

  const getUsers = async ()=>{
    try {
      const {data} = await axiosInstance.get("/messages/users");
      setUsers(data);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }
  const [input, setInput] = useState("");

  useEffect(() => {
    getUsers();
  }, []);
    const getMe = async ()=>{
    try {
      const {data} = await axiosInstance.get("/user/me");
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMe();
  }, []);


  const getMessages = async ()=>{
    try {
      const { data } = await axiosInstance.get(`/messages/${selectedUser?._id}`);
      setMessages(data);
      console.log(data);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages();
    }
  }, []);

  const handleSendMessage = async (text) => {
    try {
      const { data } = await axiosInstance.post(`/messages/send`, { senderId: user?.id, receiverId: selectedUser?._id, text });
      setMessages((prev) => [...prev, data]);
      setInput("");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="h-screen flex bg-gray-900 opacity-90 text-white">
      {/* Users list */}
      <div className="w-1/4 bg-gray-900 opacity-90 text-white border-r p-4">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <ul className="space-y-2">
          {usersList.map((user) => (
            <li
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${
                selectedUser?._id === user?._id
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              <img
                src={"./chat-app-assets/avatar_icon.png"}
                alt={user.username}
                className="w-8 h-8 rounded-full"
              />
              <span>{user.username}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Chat area */}
      <div className="flex-1 flex flex-col ">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-5 py-2">
            <div className="flex items-center gap-3 p-4 border-b bg-gray-900 opacity-90 text-white">
          <img
            src={"./chat-app-assets/avatar_icon.png"}
            alt={selectedUser?.username}
            className="w-10 h-10 rounded-full"
          />
          <h2 className="text-lg font-semibold">{selectedUser?.username}</h2>
        </div>
          <img src="./chat-app-assets/menu_icon.png" alt="Message Icon" className="w-4 h-4 cursor-pointer" />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.from === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs ${
                  msg.from === "me"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-300 text-black rounded-bl-none"
                }`}
              >
                {msg?.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t flex gap-2 bg-gray-900 opacity-90 text-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Write a message to ${selectedUser?.username}...`}
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none"
          />
          <button
            onClick={handleSendMessage.bind(null, input)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
