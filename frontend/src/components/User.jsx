import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const User = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user,setUser]=useState(null);

  const handleClick = async () => {
    try {
      const { data } = await axiosInstance.delete("/auth/logout");
      if (data) {
        localStorage.removeItem("accessToken");
        toast.success(data || "Success");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Logout failed");
    }
  };

  useEffect(()=>{
      const getMe = async ()=>{
    try {
      const {data} = await axiosInstance.get("/user/me");
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }
  getMe();
  },[]);
  localStorage.setItem("id",user?.id);


  return (
    <div className="flex">
      <div
        className={`fixed top-0 right-0 w-64 sm:w-72 lg:w-80 h-screen bg-gray-900 opacity-90 shadow-3xl border-l-2 border-sky-900 
       transform ${isOpen ? "translate-x-0" : "translate-x-80"} transition-transform
        duration-300 ease-in-out lg:translate-x-0`}
      >
        {isOpen && (
          <button
            className="lg:hidden text-gray-300 hover:text-white transition duration-300 absolute top-4 right-4"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        )}
        <div className="flex flex-col items-center justify-center pt-8 border-b border-sky-900 pb-3">
          <img
            src="./chat-app-assets/avatar_icon.png"
            alt="avatar_icon.png"
            className="w-16 sm:w-20 lg:w-24"
          />
          <h1 className="py-2.5 text-lg sm:text-xl lg:text-2xl">{user?.username || "Hi dev"}</h1>
          <p className="text-xs sm:text-sm text-center">
            Hi everyone. I'm using Easy Chat
          </p>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <button
            type="submit"
            onClick={handleClick}
            className="bg-gradient-to-br from-sky-500 to-indigo-500 px-12 sm:px-16 py-2 rounded-full cursor-pointer text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      </div>
      {!isOpen && (
        <button
          className="lg:hidden fixed top-4 right-4 bg-gray-900 p-2 rounded"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={24} />
        </button>
      )}
    </div>
  );
};

export default User;
