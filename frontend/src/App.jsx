import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
    <ToastContainer position={'bottom-right'} />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>} />
      <Route path='/reset-password' element={<ResetPassword/>} />
    </Routes>
    </>
  )
}

export default App;