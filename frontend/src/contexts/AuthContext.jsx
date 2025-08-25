import React, { createContext, useContext, useState } from 'react'

const AuthContext=createContext();

 export  const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);



  return (
    <>
    <AuthContext.Provider value={{user,setUser}}>
        {children}
    </AuthContext.Provider>
    </>
  )
}

 export const UseAuth = ()=>{
    const context = useContext(AuthContext);
    if(!context) throw new Error("No auth provider");
 } 

