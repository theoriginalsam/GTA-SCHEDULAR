import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Forgot from './Forgot';
import Reset from './Reset';
import Signup from './SignUp';
import Dashboard from './Dashboard';
import Header from './Header';
import blueSystemsLogo from './blue_systems.png'; // Import the logo image 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MatchedTA from './matchedTA';
import CoursePage from './Course';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if a token is present in localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // Token is present, verify its validity (e.g., by decoding it)
      // If the token is valid, update the isLoggedIn state to true
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    // After successful login, set isLoggedIn to true
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    // Handle logout logic (clear token from localStorage, set isLoggedIn to false)
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {isLoggedIn && <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}

      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} /> 
        <Route path="/Login" element={<Login />} />  
        <Route path="/Forgot" element={<Forgot />} />
        <Route path="/Reset" element={<Reset />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/addCourse" element={<CoursePage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Dashboard" element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" replace />} />
        <Route path="/matchedTA" element={isLoggedIn ? <MatchedTA onLogout={handleLogout} /> : <Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
