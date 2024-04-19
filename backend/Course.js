const mongoose = require('mongoose');

// Define schema
const courseSchema = new mongoose.Schema({
    courseCode: String,
    courseTitle: String,
    section: String,
    days: [String],
    timings: [{
        startTime: String,
        endTime: String,
    }],
    instructor: String,
});

// Create model
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
