import { Menu, Search, X  } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen,setIsOpen]=useState(false);
  const users=[
    {name:"Izzatbek",image:"./chat-app-assets/avatar_icon.png"},
    {name:"Elon Musk",image:"./chat-app-assets/avatar_icon.png"},
    {name:"Jack Man",image:"./chat-app-assets/avatar_icon.png"},
    {name:"Bill Gates",image:"./chat-app-assets/avatar_icon.png"},
  ]
  return (
    <div className="flex">
      <div className={`fixed top-0 left-0 w-80 h-screen bg-gray-900 opacity-90 shadow-3xl 
    border-r-2 border-sky-900 p-3 transform
     ${isOpen ? "translate-x-0":"-translate-x-80"} transition-transform duration-300 ease-in-out lg:translate-x-0`} >
      <div className="flex items-center justify-between gap-3 pb-10">
        <div className="flex items-center gap-3">
          <img src="./chat-app-assets/logo_icon.svg" alt="chat-app-assets" className='w-10' />
          <h1 className='font-extrabold'>Easy Chat</h1>
        </div>
        {
          isOpen && (
            <button onClick={()=>setIsOpen(false)}
             className="lg:hidden text-gray-300 hover:text-white transition duration-300">
              <X size={24} />
            </button>
          )
        }
      </div>
      <div className="flex items-center gap-2 border p-2 rounded-full">
        <Search size={20}/>
        <input type="text" placeholder='Search User..' className="outline-none w-full" />
      </div>
      {/* users */}
      <div className="px-4 py-6 space-y-4">
        {
          users.map((user,index)=>(
            <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 transition duration-300 p-2 rounded" key={index}>
              <img src={user.image} alt={user.name} className="w-10" />
              <h2 className="text-lg font-semibold">{user.name}</h2>
            </div>
          ))
        }
      </div>
    </div>
    {
        !isOpen && (
          <button className="lg:hidden fixed top-4 left-4 bg-gray-900"
           onClick={()=>setIsOpen(true)}>
            <Menu size={24} />
          </button>
        )
      }
    </div>
  )
}

export default Sidebar