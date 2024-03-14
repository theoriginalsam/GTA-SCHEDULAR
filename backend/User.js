// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    // User schema fields
});

userSchema.pre('save', async function(next) {
    // Password hashing logic
});

const User = mongoose.model('User', userSchema);
module.exports = User;
