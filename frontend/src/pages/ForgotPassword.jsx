import { Mail, Send } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';

const ForgotPassword = () => {
  const [email,setEmail]=useState('');

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const {data} = await axiosInstance.post("/auth/forgot-password",{email});
      toast.success(data.message || "Link sent to email");
    } catch (error) {
      console.log(error);
      toast.error("Register failed");
      localStorage.clear();
    }
  }
  return (
    <>
    <div className="w-full min-h-screen bg-image text-white bg-gray-900 pt-24 px-10">
      <div className="flex items-center justify-between pdg gap-5">
        <img src="./favicon.svg" alt="favicon" className='hidden md:block w-60' />
        <div className="border-2 border-white  p-4 w-full max-w-md rounded-md ">
          <h1 className='text-3xl font-bold pb-5 text-center'>Forgot Password</h1>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 border-2 border-white p-2.5">
              <Mail/>
              <input type="email" 
              placeholder='Email' 
               className='outline-none w-full'
               value={email}
               onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div className="text-xs cursor-pointer hover:underline transition duration-300">
                <Link to={"/login"}>Go to Login</Link>
            </div> 
            <div className="flex items-center justify-center gap-3
             border-2 p-2.5 cursor-pointer shadow-md hover:bg-gray-900 hover:opacity-90 transition duration-300">
              <Send size={20} />
              Forgot Password
            </div>
          </form>    
        </div>
      </div>
    </div>
    </>
  )
}

export default ForgotPassword