const express = require('express');
const cors = require('cors');
const xlsx = require('xlsx');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/schedulerDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));


// Login route
const bcrypt = require('bcrypt');

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });

        if (user && await bcrypt.compare(password, user.password)) {
            // If the password matches, send a success response
            res.json({ message: 'Login successful', user });
        } else {
            // If the password doesn't match or the user doesn't exist, send an error response
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        // If there's an error during the process, send an error response
        res.status(500).json({ message: 'Error logging in' });
    }
});


// Route to read schedule data from Excel file
app.get('/api/schedules', (req, res) => {
    const workbook = xlsx.readFile('C:\\Users\\sasol\\OneDrive\\MTSU\\CSCI 4700\\WebScheduler\\Book1_4.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const schedules = xlsx.utils.sheet_to_json(worksheet);
    res.json(schedules);
});

// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

