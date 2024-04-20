import React, { useEffect } from 'react';
import './Header.css';
import mtsuBanner from './mtsu.banner.jpeg'; // Adjust the path as necessary
import { Link, useNavigate } from 'react-router-dom';

function Header({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Handle sign out logic (clear token from localStorage)
    localStorage.removeItem('token');

    
  
    // Update isLoggedIn state to false
    setIsLoggedIn(false);
    
  
    // Redirect to the login page
    navigate('/');
  }
  
  useEffect(() => {
    console.log('isLoggedIn after update:', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <header className="header">
      <div className="header-logo-container">
        <img src={mtsuBanner} alt="Middle Tennessee State University" className="header-logo" />
        <Link to="/dashboard" className="header-title">
          MTSU TA Matching System
        </Link>
      </div>
  
      <div className="user-dropdown">
        <div className="user-avatar">
          <img src="#" alt="User Avatar" />
        </div>
        <div className="dropdown-content">
          <Link to="/dashboard" className="sign-out-link">
            Dashboard
          </Link>
          <button className="sign-out-link" onClick={handleSignOut}>
            <i className="" aria-hidden="true"></i> Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
