import React, { createContext } from 'react'

const AuthContext=createContext();

const AuthProvider = ({children}) => {
  return (
    <>
    <AuthContext.Provider>
        {children}
    </AuthContext.Provider>
    </>
  )
}

 const UseAuth= 

export default  AuthProvider