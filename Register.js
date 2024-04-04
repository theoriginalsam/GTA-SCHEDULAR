import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css'; // Make sure you have created this CSS file

function Register() {
  const [fname, setfName] = useState('');
  const [lname, setlName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Role, setRole] = useState('');
  

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you would handle the login logic, possibly sending a request to a backend server
    console.log('Account Created Successfully', { fname, lname, email, password, Role });
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
            onClick={setRole}

            
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
                {(e) => setRole(e.target.value)}
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