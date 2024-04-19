import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

import './Login.css'; // Make sure you have created this CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Email:', email); // Log email
    console.log('Password:', password);

    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
      

            // Store the token in localStorage
            localStorage.setItem('token', data.token);

            // Redirect to dashboard or another page
            navigate('/Dashboard');
        } else {
            console.log('Login failed', data.message);
            // Show an error message to the user
        }
    } catch (error) {
        console.error('Login error', error);
    }
};

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow login-card">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <Link to= "/Dashboard"><button type="submit" className="btn btn-primary w-100"> Sign in</button></Link>
            <div className="mt-3 text-center">
              <Link to="/Forgot">Forgot Password?</Link>
            </div>
            <div className="mt-3 text-center">
              Don't have an account? <Link to="/SignUp">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
