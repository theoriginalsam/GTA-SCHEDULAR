import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import './Reset.css'; // Make sure you have created this CSS file

function Reset() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState(false); // State variable for password match error
    const [passwordCreated, setPasswordCreated] = useState(false); // State variable for password creation status
    const [passwordRequirementsError, setPasswordRequirementsError] = useState(false); // State variable for password requirements error
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Check if new password matches the confirmation password
      if (newPassword !== confirmPassword) {
        setPasswordMatchError(true);
        return;
      }
  
      // Check if the password meets the requirements
      if (!validatePassword(newPassword)) {
        setPasswordRequirementsError(true);
        return;
      }
  
      // Reset error states
      setPasswordMatchError(false);
      setPasswordRequirementsError(false);
  
      // Set passwordCreated to true to show the success message and hide password fields
      setPasswordCreated(true);
  
      // Here, you would handle the password reset logic, possibly sending a request to a backend server
      console.log('Password reset submitted', { newPassword, confirmPassword });
    };
  
    const validatePassword = (password) => {
      // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
      return passwordRegex.test(password);
    };
  
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="card shadow login-card">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Reset your Password</h2>
            {/* Conditionally render the password match error message */}
            {passwordMatchError && (
              <div className="alert alert-danger" role="alert">
                Passwords do not match. Please try again.
              </div>
            )}
            {/* Conditionally render the password requirements error message */}
            {passwordRequirementsError && (
              <div className="alert alert-danger" role="alert">
                Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
              </div>
            )}
            {/* Conditionally render the success message and hide password fields */}
            {passwordCreated ? (
              <div>
                <div className="alert alert-success" role="alert">
                  Your new password has been created successfully!
                </div>
                {/* Display "Back to Sign In" link */}
                <div className="mt-3 text-center">
                  <a href="/">Back to Sign In</a>
                </div>
              </div>
            ) : (
              // Display password reset form if password is not yet created
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="new-password" className="form-label">Enter new Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="new-password"
                    placeholder="Enter New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirm-password" className="form-label">Confirm new Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirm-password"
                    placeholder="Confirm New Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {/* Display password requirements */}
                <h6>Password Requirements:</h6>
                <ul className="password-requirements">
                  <li>Password must be at least 8 characters long</li>
                  <li>Contain at least one uppercase letter</li>
                  <li>One lowercase letter</li>
                  <li>One number</li>
                  <li>One special character</li>
                </ul>
                <button type="submit" className="btn btn-primary w-100">Request Password Reset</button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  export default Reset;