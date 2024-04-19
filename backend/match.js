const express = require('express');
const mongoose = require('mongoose');
const Student = require('./Students');

const Course = require('./Course');


const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/schedulerDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Your isOverlapping function
const isOverlapping = (startTime1, endTime1, startTime2, endTime2) => {
   
    const timeRegex = /(\d{1,2}):(\d{2})\s([ap]m)/i;

    
    const convertToMilliseconds = (timeString) => {
        const match = timeString.match(timeRegex);
        if (!match) {
            console.error('Invalid time format:', timeString);
            return NaN;
        }
        let hour = parseInt(match[1]);
        const minute = parseInt(match[2]);
        const ampm = match[3].toLowerCase();
        if (hour === 12) {
            hour -= 12; 
        }
        if (ampm === 'pm') {
            hour += 12; 
        }
        return hour * 3600000 + minute * 60000; 
    };

    const start1 = convertToMilliseconds(startTime1);
    const end1 = convertToMilliseconds(endTime1);
    const start2 = convertToMilliseconds(startTime2);
    const end2 = convertToMilliseconds(endTime2);

    
    if (isNaN(start1) || isNaN(end1) || isNaN(start2) || isNaN(end2)) {
        console.error('Invalid time format');
        return false;
    }

    return (start1 < end2 && end1 > start2);
};

// Your matchTAToClasses function

async function matchTAToClasses() {
    try {
       
        const courses = await Course.find();

        
        const students = await Student.find();

       
        const courseAssignments = {};


        for (const course of courses) {
            const { courseCode, days, timings } = course;
            console.log(`Assigning TA for course: ${courseCode}`);

            
            const assignedTAs = new Set();

    
            for (const timing of timings) {
          
                
                if (timing && days && days.length > 0) {
                    console.log(`Checking timing for days: ${days.join(', ')}`);
                
                    for (const student of students) {
                        
                        const { studentName, courses: courses } = student;
                      
                        if (!courses || !Array.isArray(courses)) {
                            continue;
                        }

                        
                        for (const studentCourse of courses) {
                            const { days: days, time } = studentCourse;
                         
                            if (!days || !Array.isArray(days)) {
                                continue;
                            }

                           
                            if (days.some(day => days.includes(day))) {
                                
                           
                                console.log(timing.startTime, timing.endTime, time.split(' - ')[0], time.split(' - ')[1]);
                                if (!assignedTAs.has(studentName) && isOverlapping(timing.startTime, timing.endTime, time.split(' - ')[0], time.split(' - ')[1])) {
                                    
                                  
                                    assignedTAs.add(studentName);

                             
                                    if (!courseAssignments[courseCode]) {
                                        courseAssignments[courseCode] = [];
                                    }
                                    
                                    courseAssignments[courseCode].push(studentName);
                                    
                                }
                            }
                        }
                    }
                }
            }
        }

     
        console.log('Course Assignments');
        for (const courseCode in courseAssignments) {

            
            const assignedTAs = courseAssignments[courseCode];
            console.log(`Course: ${courseCode}, Assigned TAs: ${assignedTAs.join(', ')}\n`);
            console.log('------------------');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Route to fetch course assignments
app.get('/match', async (req, res) => {
    try {
        const courseAssignments = await matchTAToClasses();
        res.json(courseAssignments);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
