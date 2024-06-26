import { useEffect } from "react"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import qs from 'qs'
import webcam from 'react-webcam'
import Camera from "./Camera"

function Home()
{
    // const navigate=useNavigate()
    
    // axios.defaults.withCredentials = true
    // useEffect(()=>{
    //     axios.post('http://192.168.242.97:8000/users/check', qs.stringify(data), {
    //       headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //       }
    //     })
    //     .then(res=>{
    //         if(res.status===200)
    //             {
                    
    //             }
    //         else
    //         {
    //             navigate('/')
    //         }    
    //     })
    // })

    const handlelogout=()=>{
    //     axios.post('')
    //     .then(res=>{
    //         if(res.status===200)
    //             {
    //                 navigate('/login')
    //             }
    //     }).catch(err=>{
    //         console.log(err)
    //     })
    }
    return(
        <>
        <h1>MED SCANNER</h1>
            <button><Link to="/dashboard"> Dashboard</Link></button>
            <br/>
            
            <br/>
            <button onClick={handlelogout}> Logout</button>
            <br/>
            <br/>
            <Camera/>
        </>
    )
}
export default Home