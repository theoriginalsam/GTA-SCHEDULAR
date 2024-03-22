// routes/authRoutes.js
const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const router = express.Router();

// Sign-in endpoint
router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            res.json({ message: 'Login successful', user: { username: user.username, role: user.role } });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error during sign in' });
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
