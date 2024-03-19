import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Forgot.css'; // Make sure you have created this CSS file

function Forgot() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) {
      alert('Please enter your email address.');
      return; // Stop further execution if email is empty
    }
    // Here, you would handle the login logic, possibly sending a request to a backend server
    console.log('Login submitted', { email });
    navigate('/Reset');
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow login-card">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Forgot your password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Enter email address</label>
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
            <button type="submit" className="btn btn-primary w-100">Reset Password</button>
          </form>
          <div className="mt-3 text-center">
            <Link to="/">Back to Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgot;