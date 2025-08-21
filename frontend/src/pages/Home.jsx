import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate=useNavigate();

   useEffect(()=>{
          if(!localStorage.getItem("accessToken")){
            navigate("/login");
          }
        },[navigate]);
  return (
    <>
    <div className="w-full h-screen bg-gray-900 opacity-90 text-white backdrop-blur-3xl">a</div>
    </>
  )
}

export default Home