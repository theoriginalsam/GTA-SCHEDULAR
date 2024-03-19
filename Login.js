import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Make sure you have created this CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you would handle the login logic, possibly sending a request to a backend server
    console.log('Login submitted', { email, password });
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
            <button type="submit" className="btn btn-primary w-100">Sign in</button>
            <div className="mt-3 text-center">
              <Link to="/Forgot">Forgot Password?</Link>
            </div>
            <div className="mt-3 text-center">
              Don't have an account? <Link to="/register">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
