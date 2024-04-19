const mongoose = require('mongoose');

// Define the schema for the student schedule
const studentScheduleSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  courses: [{
    courseCode: { type: String, required: true },
    days: { type: [String], required: true },
    time: { type: String, required: true }
  }]
});

// Create the StudentSchedule model
const StudentSchedule = mongoose.model('StudentSchedule', studentScheduleSchema);

module.exports = StudentSchedule;
