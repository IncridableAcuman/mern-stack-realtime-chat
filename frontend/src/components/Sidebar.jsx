import { Menu, Search, X } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const users = [
    { name: "Izzatbek", image: "./chat-app-assets/avatar_icon.png" },
    { name: "Elon Musk", image: "./chat-app-assets/avatar_icon.png" },
    { name: "Jack Man", image: "./chat-app-assets/avatar_icon.png" },
    { name: "Bill Gates", image: "./chat-app-assets/avatar_icon.png" },
    { name: "Mark Zuckerberg", image: "./chat-app-assets/avatar_icon.png" },
    { name: "Steve Jobs", image: "./chat-app-assets/avatar_icon.png" },
    { name: "Jeff Bezos", image: "./chat-app-assets/avatar_icon.png" },
    { name: "Sundar Pichai", image: "./chat-app-assets/avatar_icon.png" },
    { name: "Izzatbek", image: "./chat-app-assets/avatar_icon.png" },
    { name: "Elon Musk", image: "./chat-app-assets/avatar_icon.png" },
    { name: "Jack Man", image: "./chat-app-assets/avatar_icon.png" },
    { name: "Bill Gates", image: "./chat-app-assets/avatar_icon.png" },
    { name: "Mark Zuckerberg", image: "./chat-app-assets/avatar_icon.png" },
    { name: "Steve Jobs", image: "./chat-app-assets/avatar_icon.png" },
    { name: "Jeff Bezos", image: "./chat-app-assets/avatar_icon.png" },
    { name: "Sundar Pichai", image: "./chat-app-assets/avatar_icon.png" },
    // test uchun ko‘p user qo‘ydim
  ];

  return (
    <div className="flex">
      <div
        className={`fixed top-0 left-0 w-64 sm:w-72 lg:w-80 h-screen bg-gray-900 opacity-90 shadow-3xl 
    border-r-2 border-sky-900 p-3 transform
     ${isOpen ? "translate-x-0" : "-translate-x-80"} transition-transform duration-300 ease-in-out lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 pb-6">
          <div className="flex items-center gap-3">
            <img
              src="./chat-app-assets/logo_icon.svg"
              alt="chat-app-assets"
              className="w-8 sm:w-10"
            />
            <h1 className="font-extrabold text-sm sm:text-base md:text-lg">
              Easy Chat
            </h1>
          </div>
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-300 hover:text-white transition duration-300"
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 border p-2 rounded-full">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search User.."
            className="outline-none w-full bg-transparent text-sm sm:text-base"
          />
        </div>

        {/* Users list */}
        <div className="px-2 py-4 mt-4 space-y-2 overflow-y-auto h-[calc(100vh-180px)] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent scrollbar-hide">
          {users.map((user, index) => (
            <div
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 transition duration-300 p-2 rounded"
              key={index}
            >
              <img src={user.image} alt={user.name} className="w-8 sm:w-10" />
              <h2 className="text-sm sm:text-base font-semibold truncate max-w-[140px] sm:max-w-[200px]">
                {user.name}
              </h2>
            </div>
          ))}
        </div>{/* Users list */}
<div
  className="px-2 py-4 mt-4 space-y-2 overflow-y-auto h-[calc(100vh-180px)] scrollbar-hide"
>
  {users.map((user, index) => (
    <div
      className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 transition duration-300 p-2 rounded"
      key={index}
    >
      <img src={user.image} alt={user.name} className="w-8 sm:w-10" />
      <h2 className="text-sm sm:text-base font-semibold truncate max-w-[140px] sm:max-w-[200px]">
        {user.name}
      </h2>
    </div>
  ))}
</div>

      </div>

      {/* Toggle button */}
      {!isOpen && (
        <button
          className="lg:hidden fixed top-4 left-4 bg-gray-900 p-2 rounded"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={24} />
        </button>
      )}
    </div>
  );
};

export default Sidebar;
