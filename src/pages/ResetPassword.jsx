import React, { useState } from "react";
import "../App.css";
import Axios from 'axios'
import qs from 'qs'
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate=useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault()

        const data = {
          email,
          new_password:password
        };

        Axios.post(`${import.meta.env.VITE_API_URL}/users/reset-password`, qs.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },withCredentials:true
        }).then(res => {
          console.log(res);
          if (res.status === 200) {
            navigate('/');
          }
        }).catch(err => {
          // console.log(err);
          console.log('Network Error:', err.message);
          console.error('Full Error:', err);
        });
        // write for put method
        // Axios.put('',{
        //     email,
        //     password
        // }).then(res=>{
        //     console.log(res)
        //     if(res.json.status)
        //         {

        //             navigate('/Login')
        //         }
        // }).catch(err=>{
        //     console.log(err)
        // })
    }    

  return (
    <><h1 className="h">MEDSCAN</h1>
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h1>Reset Password</h1>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Email"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          placeholder="Enter new Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Reset</button>
        <p>Dont have an Account?<Link to="/Signup">Signup</Link></p>
      </form>
    </div>
    </>
  )
}

export default ResetPassword