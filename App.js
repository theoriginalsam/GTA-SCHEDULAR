import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Forgot from './Forgot';
import Reset from './Reset';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import blueSystemsLogo from './blue_systems.png'; // Import the logo image 

function App() {
  return (
    <div className="App">
      <img src={blueSystemsLogo} alt="Blue Systems Logo" className="blue-systems-logo" />  
      <Router>
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/Forgot" element={<Forgot />} />
          <Route path="/Reset" element={<Reset />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
