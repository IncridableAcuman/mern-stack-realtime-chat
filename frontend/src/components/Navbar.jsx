import { Info } from 'lucide-react';
const Navbar = () => {
  return (
    <div className='flex items-center justify-between p-2 border-b border-sky-900 mx-2'>
      <div className="flex items-center gap-2">
        <img src="./chat-app-assets/avatar_icon.png" alt="avatar_icon.png" className='w-8' />
        <h1 className='text-gray-400'>Izzatbek</h1>
      </div>
      <Info className='text-sky-800 cursor-pointer hover:text-sky-700 transition duration-300' />
    </div>
  )
}

export default Navbar