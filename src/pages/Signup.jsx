import React, { useState } from "react";
import "../App.css";
import Axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import qs from 'qs';

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");

  const navigate=useNavigate()
  // console.log(`${process.env.REACT_APP_IP}`)
    const handleSubmit=(e)=>{
        e.preventDefault()
        // console.log(`${process.env.REACT_APP_IP}`)

        const data = {
          username,
          email,
          contact,
          password
        };

        Axios.post(`${import.meta.env.VITE_API_URL}/users`, qs.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
          console.log(res);
          if (res.status === 201) {
            navigate('/');
          }
        }).catch(err => {
          console.log(err);
        });
      

        // Axios.post('http://192.168.130.97:8000/users/', qs.stringify(data), {
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        //   }).then(res=>{
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
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h1>Signup</h1>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Email"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />

<label htmlFor="contact">Contact Number:</label>
        <input
          type="text"
          placeholder="Contact Number"
         
          onChange={(e) => setContact(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign Up</button>
        <p>Have an Account?<Link to="/">Login</Link></p>
      </form>
    </div>
  );
}
export default Signup;
