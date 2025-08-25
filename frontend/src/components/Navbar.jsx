import { Info } from "lucide-react";

const Navbar = ({selectedUser}) => {
  return (
    <div className="flex items-center justify-between px-2 sm:px-4 py-2 pt-18 md:pt-4 border-b border-sky-900 mx-2">
      {/* Chap tomon (avatar + ism) */}
      <div className="flex items-center gap-2 sm:gap-3">
        <img
          src="./chat-app-assets/avatar_icon.png"
          alt="avatar_icon.png"
          className="w-8 sm:w-10"
        />
        <h1 className="text-gray-400 text-sm sm:text-base md:text-lg truncate max-w-[120px] sm:max-w-[200px]">
          {selectedUser?.username || "Hi Dev"}
        </h1>
      </div>

      {/* O‘ng tomon (Info icon) */}
      <Info
        className="text-sky-800 cursor-pointer hover:text-sky-700 transition duration-300"
        size={20} // kichikroq ekranda mos bo‘ladi
      />
    </div>
  );
};

export default Navbar;
