import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import blueSystemsLogo from './blue_systems.png'; 

function App() {
  return (
    <div className="App">
      <img src={blueSystemsLogo} alt="Blue Systems Logo" className="blue-systems-logo" />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
