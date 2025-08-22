import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import Message from "./Message";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <div className="w-full h-screen bg-image text-white">
        <div className="w-full h-screen bg-gray-900 text-white opacity-90">
          <div className="flex flex-col lg:flex-row items-stretch justify-between h-full">
            <Sidebar />
            <div className="flex-1 flex justify-center">
              <Message />
            </div>
            <User />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
