import { Lock, Mail, Send, User } from 'lucide-react';
import { useState } from 'react';
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
                      toast.success("Successfully" | data.message);
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
                        toast.success("Successfully" | data.message);
                        navigate("/");
                      } catch (error) {
                        console.log(error);
                        toast.error("Register failed");
                        localStorage.clear();
                      }
                  }
        }
      
  return (
    <>
    <div className="w-full min-h-screen bg-image text-white bg-gray-900 pt-24 px-10">
      <div className="flex items-center justify-between pdg gap-5">
        <img src="./favicon.svg" alt="favicon" className='hidden md:block w-60' />
        <div className="border-2 border-white  p-4 w-full max-w-md rounded-md ">
          <h1 className='text-3xl font-bold pb-5 text-center'>{isLogin?"Sign In":"Sign Up"}</h1>
          <form className='space-y-4' onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="flex items-center gap-2 border-2 border-white p-2.5">
              <User/>
              <input type="text"
               placeholder='Username'
                className='outline-none w-full'
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                 />
            </div>
            )}
            <div className="flex items-center gap-2 border-2 border-white p-2.5">
              <Mail/>
              <input type="email" 
              placeholder='Email' 
               className='outline-none w-full'
               value={email}
               onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-2 border-2 border-white p-2.5">
              <Lock/>
              <input type="password" 
              placeholder='Password'
              className='outline-none w-full'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
               />
            </div>
            <div className="text-xs flex items-center justify-between">
              <Link to="/forgot-password">Forgot Password</Link>
              <p>Need Help</p>
            </div>
            <div className="flex items-center justify-center gap-3
             border-2 p-2.5 cursor-pointer shadow-md hover:bg-gray-900 hover:opacity-90 transition duration-300">
              <Send size={20} />
              {isLogin?"Sign In":"Sign Up"}
            </div>
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