import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './Login';
import Forgot from './Forgot';
import Reset from './Reset';
import Signup from './SignUp';
import Dashboard from './Dashboard';
import Header from './Header';
import blueSystemsLogo from './blue_systems.png'; // Import the logo image 
import MatchedTA from './matchedTA';
import CoursePage from './Course';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { FaTimes } from 'react-icons/fa';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [courses, setCourses] = useState([
    { id: 'CSRM', title: 'Research Methods in Computer Science', tas: ['TA1', 'TA2'] },
    { id: 'NNETS', title: 'Neural Nets', tas: ['TA3'] },
    { id: 'WEBT', title: 'Web Technologies', tas: [] },
    { id: 'CSDM', title: 'Data Mining', tas: ['TA4'] },
  ]);
  const [tas, setTas] = useState([
    { id: 'TA1', name: 'Alice' },
    { id: 'TA2', name: 'Bob' },
    { id: 'TA3', name: 'Charlie' },
    { id: 'TA4', name: 'David' },
  ]);
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleGenerateSchedules = () => {
    const newSchedules = generateSchedules();
    setSchedules(newSchedules);
  };

  const generateSchedules = () => {
    return courses.filter(course => course.tas.length > 0).map(course => ({
      id: course.id,
      description: `${course.title}: Assigned TAs - ${course.tas.map(taId => {
        const ta = tas.find(t => t.id === taId);
        return ta ? ta.name : 'Unassigned';
      }).join(', ')}`
    }));
  };

  return (
    <div className="app">
      {isLoggedIn && <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
      <h1>Welcome to GTA scheduler</h1>

      <Routes>
        <Route path="/Login" element={<Login onLogin={handleLogin} />} />
        <Route path="/Forgot" element={<Forgot />} />
        <Route path="/Reset" element={<Reset />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/" element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" replace />} />
        <Route path="/Dashboard" element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" replace />} />
        <Route path="/addCourse" element={isLoggedIn ? <CoursePage onLogout={handleLogout} /> : <Navigate to="/" replace />} />
        <Route path="/matchedTA" element={isLoggedIn ? <MatchedTA onLogout={handleLogout} /> : <Navigate to="/" replace />} />
      </Routes>

      <div className="content">
        {/* Your existing page-specific content and functions, such as generating schedules */}
      </div>
    </div>
  );
}

export default App;
