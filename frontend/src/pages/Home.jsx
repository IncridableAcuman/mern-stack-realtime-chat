import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatApp from "../components/ChatApp";

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
          <ChatApp/>
        </div>
      </div>
    </>
  );
};

export default Home;
