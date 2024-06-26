import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './pages/Navbar'
import './App.css'
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload'

function App() {


  return (
    <>
    {/* <Navbar/> */}
    <BrowserRouter>
    <Routes>
    <Route path="/home" element={<Home/>}></Route>
    <Route path="/" element={<Login/>}></Route>
    <Route path="/Signup" element={<Signup/>}></Route>
    <Route path="/forgotPassword" element={<ForgotPassword/>}></Route>
    <Route path="/ResetPassword" element={<ResetPassword/>}></Route>
    <Route path="/dashboard" element={<Dashboard/>}></Route>
    <Route path="/Upload" element={<Upload/>}></Route>

  </Routes>
  </BrowserRouter>
  </>
  )
}

export default App
