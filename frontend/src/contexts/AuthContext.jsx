import React, { createContext, useContext, useState } from 'react'
import axiosInstance from '../api/axiosInstance';

const AuthContext=createContext();

 export  const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);

  const getMe = async ()=>{
    try {
      const {data} = await axiosInstance.get("/user/me");
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <AuthContext.Provider value={{user,setUser,getMe}}>
        {children}
    </AuthContext.Provider>
    </>
  )
}

 export const UseAuth = ()=>{
    const context = useContext(AuthContext);
    if(!context) throw new Error("No auth provider");
 } 

