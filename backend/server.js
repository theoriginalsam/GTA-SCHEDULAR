const express = require('express');
const cors = require('cors');
const xlsx = require('xlsx');
const path = require('path');
const mongoose = require('mongoose');
const authRoutes = require('./authRoutes'); // Adjust the path as needed

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/schedulerDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));


// Use authRoutes for authentication-related routes
app.use('/api', authRoutes);

// Route to read schedule data from Excel file
app.get('/api/schedules', (req, res) => {
    try {
        const workbook = xlsx.readFile('C:\\Users\\sasol\\OneDrive\\MTSU\\CSCI 4700\\WebScheduler\\Book1_4.xlsx');
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const schedules = xlsx.utils.sheet_to_json(worksheet);
        res.json(schedules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error reading schedules' });
    }
});

// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

