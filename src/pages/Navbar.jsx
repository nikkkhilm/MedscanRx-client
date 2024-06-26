// type rfc or rfce for template
import React from 'react';
import {Link} from 'react-router-dom';
// allows for client-side navigation between different components or pages within the application without causing a full page reload.
// Using Link, you define the target path declaratively with the to prop, making your code more readable and maintainable.


export default function Navbar() {
  const handlelogout=()=>{
        axios.post('')
        .then(res=>{
            if(res.status===200)
                {
                    navigate('/login')
                }
        }).catch(err=>{
            console.log(err)
        })
    }

  return (
    <nav className='navbar'>

        <h1>MED SCANNER</h1>
        <div className="nav-links">
        <button className='nav-button'><Link to='/Home'>HOME</Link></button>
        <button className='nav-button' ><Link to='/About'>About Us</Link></button>
        <button className='nav-button' ><Link to="/dashboard"> Dashboard</Link></button>
        <button className='nav-button' onClick={handlelogout}> Logout</button>
        </div>
    </nav>

  )
}
