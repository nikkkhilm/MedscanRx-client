import React, { useState } from 'react';
import cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    cookies.remove('token'); // Remove the token cookie
    navigate('/'); // Navigate to the login page
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <nav className="navbar">
      <h1>MED SCANNER</h1>
      <div className="nav-links">
        <Link to='/Home' className='nav-button'>HOME</Link>
        <Link to='/About' className='nav-button'>About Us</Link>
        <Link to='/dashboard' className='nav-button'>Dashboard</Link>
        <button className='nav-button' onClick={handleLogout}>Logout</button>
        <button className="nav-button sideimg" onClick={toggleSidebar}>
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={toggleSidebar}>
          ✕
        </button>
        <br/>
        <div className="sidebar-content">
          <h2>Profile Info</h2>
          {/* Add your profile information here */}
          <ul>
            <li>
              <Link to="/services" onClick={toggleSidebar}>
                Services
              </Link>
            </li>
            {/* Add more sidebar links as needed */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
