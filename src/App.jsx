import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './Navbar'
import './App.css'
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';

function App() {


  return (
    <>
    {/* <Navbar/> */}
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/Login" element={<Login/>}></Route>
    <Route path="/Signup" element={<Signup/>}></Route>
    <Route path="/forgotPassword" element={<ForgotPassword/>}></Route>
    <Route path="/ResetPassword" element={<ResetPassword/>}></Route>
    <Route path="/dashboard" element={<Dashboard/>}></Route>
  </Routes>
  </BrowserRouter>
  </>
  )
}

export default App
