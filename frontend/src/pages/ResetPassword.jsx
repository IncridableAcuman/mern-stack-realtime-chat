import { Lock, Send } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [password,setPassword]=useState('');
  const [confirmPassword,setConfirmPassword]=useState('');
  const {token}=useParams();
  const navigate=useNavigate();

    const handleSubmit = async (e)=>{
    e.preventDefault();
    if(password!==confirmPassword){
      toast.info("Password must be equal");
    }
    try {
      const {data} = await axiosInstance.put("/auth/reset-password",{token,password});
      toast.success(data || "Password updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Register failed");
      localStorage.clear();
    }
  }

   useEffect(()=>{
            if(localStorage.getItem("accessToken")){
              navigate("/");
            }
          },[navigate]);

  return (
    <>
    <div className="w-full min-h-screen bg-image text-white bg-gray-900 pt-24 px-10">
      <div className="flex items-center justify-between pdg gap-5">
       <div className="hidden md:block">
          <img src="./favicon.svg" alt="favicon" className='w-60' />
          <h2 className='text-center py-2 text-2xl lg:text-4xl font-extrabold'>Real Time Chat</h2>
        </div>
        <div className="border-2 border-white  p-4 w-full max-w-md rounded-md bg-gray-900 opacity-90 shadow-md ">
          <h1 className='text-3xl font-bold pb-5 text-center'>Update Password</h1>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 border-2 border-white p-2.5">
              <Lock/>
              <input type="password" 
              placeholder='Password' 
               className='outline-none w-full'
               value={password}
               onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-2 border-2 border-white p-2.5">
              <Lock/>
              <input type="password" 
              placeholder='Confirm Password'
              className='outline-none w-full'
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
               />
            </div>
            <div className="flex items-center justify-center gap-3
             border-2 p-2.5 cursor-pointer shadow-md hover:bg-gray-900 hover:opacity-90 transition duration-300">
              <Send size={20} />
              Update Password
            </div>
          </form>
            
        </div>
      </div>
    </div>
    </>
  )
}

export default ResetPassword