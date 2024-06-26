import React, { useState } from "react";
import "../App.css";
import Axios from 'axios'
import qs from 'qs'
import { Link, useNavigate } from "react-router-dom";
import cookies from 'js-cookie'

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate=useNavigate()

  Axios.defaults.withCredentials = true;

    const handleSubmit=(e)=>{
        e.preventDefault()

        const data = {
          email,
          password
        };

        Axios.post('http://192.168.191.97:8000/login', qs.stringify(data), {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },withCredentials:true
        }).then(res => {
          console.log(res);
          if (res.status === 200) {
            const token=res.data.access_token;
            cookies.set('token',token,{expires:1});
            navigate('/');
          }
        }).catch(err => {
          // console.log(err);
          console.log('Network Error:', err.message);
          console.error('Full Error:', err);
        });
        // Axios.post('http://192.168.130.97:8000/login', qs.stringify(data), {
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        //   }
        // put http request here
        // Axios.post('',{
        //     email,
        //     password
        // }).then(res=>{
        //     console.log(res)
        //     if(res.json.status)
        //         {

        //             navigate('/')
        //         }
        // }).catch(err=>{
        //     console.log(err)
        // })

    }

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Email"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
        <Link to="/forgotPassword">Forgot Password</Link>
        <p>Dont have an Account?<Link to="/Signup">Signup</Link></p>
      </form>
    </div>
  );
}
export default Login;
