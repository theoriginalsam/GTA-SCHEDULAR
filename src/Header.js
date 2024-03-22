// Header.js
import React from 'react';
import './Header.css';
import mtsuLogo from './mtsu.banner.jpeg'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';
function Header() {
  const navigate = useNavigate();

  const handleSignOut = (event) => {
    event.preventDefault();
    // Clear any authentication tokens or session data here
    console.log('Signing out');
    navigate('/login'); // Redirect to the login page
  };

  return (
    <header className="header">
      <img src={mtsuLogo} alt="Middle Tennessee State University" className="header-logo" />
      <h1>College State University</h1>
      <a href="/sign-out" className="sign-out-link" onClick={handleSignOut}>
        <i className="fa fa-sign-out" aria-hidden="true"></i> Sign Out
      </a>
    </header>
  );
}

export default Header;
