import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'; // Make sure you have created this CSS file

function Register() {
  const [fname, setfName] = useState('');
  const [lname, setlName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Role, setRole] = useState('');
  
  const navigate = useNavigate(); 


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: fname,
          lastName: lname,
          email: email, // Assuming email is used as the username
          password,
          role: Role,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Account Created Successfully', data.message);
      // Redirect to dashboard
      navigate('/Dashboard'); // Add this line to redirect to the dashboard
    } catch (error) {
      console.error('Error during registration', error);
      // Display an error message to the user
    }
  };
  

  function RadioButtons() {
    const [selectedOption, setSelectedOption] = useState('');
  
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
      setRole(event.target.value);

    };
  
    return (
      <div className="radio-button-container">
        <label>
          <input
            type="radio"
            name="options"
            value="Admin"
            checked={selectedOption === 'Admin'}
            onChange={handleOptionChange}
          />
          Admin
        </label>
  
        <label>
          <input
            type="radio"
            name="options"
            value="TA"
            checked={selectedOption === 'TA'}
            onChange={handleOptionChange}

            
          />
          TA
        </label>

        <p>Selected Option: {selectedOption}</p>
      </div>
    );
  }
  
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow login-card">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fname" className="form-label">First Name</label>
              <input
                type="fname"
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
                type="lname"
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
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role</label>
                <RadioButtons />
            </div>
            <div>
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign up</button>
            <div className="mt-3 text-center">
            <div className="mb-3 form-check">
              <label className="form-check-label" htmlFor="signin">
                Already have an account?
              </label>
            </div>
              <Link to="/Login">Sign in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
