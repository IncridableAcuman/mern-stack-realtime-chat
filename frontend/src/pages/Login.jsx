import { Lock, Mail, Send, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';

const Login = () => {
  const [isLogin,setIsLogin]=useState(true);
  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigate=useNavigate();

        const handleSubmit = async (e)=>{
          e.preventDefault();
          if(isLogin){
                  try {
                      const {data} = await axiosInstance.post("/auth/login",{email,password});
                      localStorage.setItem("accessToken",data.accessToken);
                      toast.success("Successfully");
                      navigate("/");
                  } catch (error) {
                      console.log(error);
                      toast.error("Login failed");
                      localStorage.clear();
                  }
          } else{
                  try {
                        const {data} = await axiosInstance.post("/auth/register",{username,email,password});
                        localStorage.setItem("accessToken",data.accessToken);
                        toast.success("Successfully");
                        navigate("/");
                      } catch (error) {
                        console.log(error);
                        toast.error("Register failed");
                        localStorage.clear();
                      }
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
        <div className="border-2 border-white bg-gray-900 opacity-90 shadow-md  p-4 w-full max-w-md rounded-md ">
          <h1 className='text-3xl font-bold pb-5 text-center'>{isLogin?"Sign In":"Sign Up"}</h1>
          <form className='space-y-4' onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="flex items-center gap-2 border-2 border-white p-2.5 rounded-md">
              <User/>
              <input type="text"
               placeholder='Username'
                className='outline-none w-full bg-transparent'
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                required
                 />
            </div>
            )}
            <div className="flex items-center gap-2 border-2 border-white p-2.5 rounded-md">
              <Mail/>
              <input type="email" 
              placeholder='Email' 
               className='outline-none w-full bg-transparent'
               value={email}
               onChange={(e)=>setEmail(e.target.value)}
               required
                />
            </div>
            <div className="flex items-center gap-2 border-2 border-white p-2.5 rounded-md">
              <Lock/>
              <input type="password" 
              placeholder='Password'
              className='outline-none w-full bg-transparent'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
               />
            </div>
            <div className="text-xs flex items-center justify-between">
              <Link to="/forgot-password">Forgot Password</Link>
              <p>Need Help</p>
            </div>
            <button className="w-full flex items-center justify-center gap-3
             border-2 p-2.5 cursor-pointer shadow-md rounded-md hover:bg-gray-900 hover:opacity-90 transition duration-300">
              <Send size={20} />
              {isLogin?"Sign In":"Sign Up"}
            </button>
          </form>
          <div className="pt-3 text-sm">
            {
            isLogin ? (
              <p >Don't have an account?{" "} 
              <span className='underline cursor-pointer transition' onClick={()=>setIsLogin(false)}>Sign Up</span></p>
            ) : (
              <p>Already have an account?{" "}
               <span className='underline cursor-pointer transition' onClick={()=>setIsLogin(true)}>Sign In</span></p>
            )
          }
            </div>     
        </div>
      </div>
    </div>
    </>
  )
}

export default Login