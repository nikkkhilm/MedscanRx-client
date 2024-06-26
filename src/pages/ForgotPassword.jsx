import React,{useState} from 'react'
import "../App.css";
import Axios from 'axios'
import qs from'qs'
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");

  const navigate=useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault()

        const data = {
          email
        };

        Axios.post('http://192.168.191.97:8000/users/check', qs.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },withCredentials:true
        }).then(res => {
          console.log(res);
          if (res.status === 200) {
            navigate('/ResetPassword');
          }
        }).catch(err => {
          // console.log(err);
          console.log('Network Error:', err.message);
          console.error('Full Error:', err);
        });
        // place the route for backend
        // Axios.post('',{
        //     email
        // }).then(res=>{
        //     console.log(res)
        //     if(res.json.status)
        //         {
                    
        //             navigate('/ResetPassword')
        //         }
        // }).catch(err=>{
        //     console.log(err)
        // })
    }

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
       
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Email"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Sign Up</button>
        <p>Have an Account?<Link to="/">Login</Link></p>
      </form>
    </div>
  )
}

export default ForgotPassword