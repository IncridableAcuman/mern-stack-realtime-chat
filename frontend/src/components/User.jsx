import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const User = () => {
  const navigate=useNavigate();
  const [isOpen,setIsOpen]=useState(false);

  const handleClick = async ()=>{
    try {
      const {data} = await axiosInstance.delete("/auth/logout");
      if(data){
        localStorage.removeItem("accessToken");
        toast.success(data || "Success");
        navigate("/login");
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message || "Logout failed");

    }
  }

  return (
   <div className="flex">
    <div className={`fixed top-0 right-0 w-80 h-screen bg-gray-900 opacity-90 shadow-3xl border-l-2 border-sky-900 
       transform ${isOpen ? "translate-x-0":"-translate-x-80"} transition-transform
        duration-300 ease-in-out lg:translate-x-0`} >
          {
            isOpen && (
              <button className="lg:hidden text-gray-300 hover:text-white transition duration-300"
               onClick={()=>setIsOpen(false)}>
                <X size={24} />
              </button>
            )
          }
        <div className="flex flex-col items-center justify-center pt-8 border-b border-sky-900 pb-3">
            <img src="./chat-app-assets/avatar_icon.png" alt="avatar_icon.png" className='w-24' />
            <h1 className='py-2.5 text-2xl'>Izzatbek</h1>
            <p className='text-xs'>Hi everyone.I'm using Easy Chat</p>
        </div>
        <div className='fixed bottom-2 right-16'>
            <button type="submit" onClick={handleClick} className='bg-gradient-to-br from-sky-500 to-indigo-500 px-16 py-2 rounded-full cursor-pointer'>Logout</button>
        </div>
    </div>
    {
      !isOpen && (
        <button className="lg:hidden fixed top-4 right-4"
         onClick={()=>setIsOpen(true)}>
          <Menu size={24} />
        </button>
      )
    }
   </div>
  )
}

export default User