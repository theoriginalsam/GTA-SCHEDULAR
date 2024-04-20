// routes/authRoutes.js
const express = require('express');
const User = require('./User');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Helper function to validate email
const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Helper function to validate password
const validatePassword = (password) => {
    console.log("Validating password:", password);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/;
    const isValid = passwordRegex.test(password);
    console.log("Password valid:", isValid);
    return isValid;  };

// Signup endpoint
router.post('/signup', async (req, res) => {
    console.log(req.body);
    const { fname, lname, email, password } = req.body;
        // Validate email and password
        if (!validateEmail(email) || !validatePassword(password)) {
            return res.status(400).json({ message: 'Invalid email or password format' });
        }
    try {
        // Check if a user with the given email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the hashed password
        const newUser = new User({
            firstName: fname,
            lastName: lname,
            email,
            password: hashedPassword
        });
        console.log(newUser);

        // Save the new user to the database
        await newUser.save();

        // Respond with success
        res.status(201).json({ message: 'User registered successfully', user: { firstName: newUser.firstName, lastName: newUser.lastName, email: newUser.email, } });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Error during registration' });
    }
});


// Sign-in endpoint
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        // Find the user by email
        const user = await User.findOne({ email: email });
        console.log(user);
        if (!user) {
            // If the user doesn't exist, send an error response
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Check if the password matches
        const passwordMatch = await bcrypt.compare(password, user.password);
       console.log(passwordMatch);
        if (!passwordMatch) {
            // If the password doesn't match, send an error response
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // If the email and password are correct, generate a JWT token
        const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

        // Send a success response along with the token
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        // If there's an error during the process, send an error response
        res.status(500).json({ message: 'Error logging in' });
    }
});

// Password reset request endpoint
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
        await user.save();

        // Send the reset token to the user's email. Implement your email sending logic here.

        res.json({ message: 'Password reset token sent to email' });
    } catch (error) {
        res.status(500).json({ message: 'Error during password reset request' });
    }
});


// Password reset endpoint
router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await User.findOne({ 
            resetPasswordToken: hashedToken, 
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: 'Password has been reset successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error during password reset' });
    }
});

module.exports = router;
