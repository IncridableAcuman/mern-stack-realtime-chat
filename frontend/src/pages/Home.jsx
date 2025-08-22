import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import User from '../components/User';
import Message from './Message';

const Home = () => {
  const navigate=useNavigate();

   useEffect(()=>{
          if(!localStorage.getItem("accessToken")){
            navigate("/login");
          }
        },[navigate]);
  return (
    <>
    <div className="w-full h-screen bg-image text-white">
      <div className="w-full h-screen bg-gray-900 text-white opacity-90">
        <div className="flex items-center justify-between">
          <Sidebar/>
          <Message/>
          <User/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home