import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css'; // Make sure you have created this CSS file

function Signup() {
  const [fname, setfName] = useState('');
  const [lname, setlName] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate(); // Proper instantiation of the navigate function

  const validatePassword = (password) => {
    console.log("Validating password:", password);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/;
    const isValid = passwordRegex.test(password);
    console.log("Password valid:", isValid);
    return isValid;  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check password validity
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fname, lname, email, password })
      });
      const data = await response.json();
      console.log("Response OK:", response.ok); // Log response status
      console.log("Data Received:", data); // Log the received data

      if (response.ok) {
        console.log('Signup successful', data);
        console.log('Attempting to navigate to Dashboard');
        navigate('/Dashboard');
        console.log('Navigate called');

      } else {
        console.log('Signup failed', data.message);
        setPasswordError(data.message || 'Failed to sign up');
        // Show an error message to the user
      }
    } catch (error) {
      console.error('Signup error', error);
      setPasswordError('An error occurred during sign up.');
    }
  };
  
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow signup-card">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fname" className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                id="fname"
                placeholder="Enter First Name"
                required
                value={fname}
                onChange={(e) => setfName(e.target.value)}
              />
              </div>
            <div className="mb-3">
              <label htmlFor="lname" className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lname"
                placeholder="Enter Last Name"
                required
                value={lname}
                onChange={(e) => setlName(e.target.value)}
              />
              </div>
              <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter email"
                required
                value={email}
                onChange={(e) => setemail(e.target.value)}
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
            <button type="submit" className="btn btn-primary w-100">Sign up</button>
            <div className="mt-3 text-center">
              Already have an account? <Link to="/Login">Login</Link>
            </div>
            {passwordError && <p className="text-danger">{passwordError}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
