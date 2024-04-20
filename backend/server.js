const express = require('express');
const cors = require('cors');
const xlsx = require('xlsx');
const path = require('path');
const User = require('./User');
const Course = require('./Course');
const StudentSchedule = require('./Students')
const authRoutes = require('./authRoutes'); // Adjust the path as needed

const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Use authRoutes for authentication-related routes
app.use('/api', authRoutes);

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/schedulerDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));


// Login route
const bcrypt = require('bcrypt');

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

        
        const students = await StudentSchedule.find();

       
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

           console.log('Course Assignments:', courseAssignments);
            return courseAssignments;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
app.get('/matchedTA', async (req, res) => {
    try {
        const courseAssignments = await matchTAToClasses();
        
       res.json(courseAssignments);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// app.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         console.log(email, password);
//         // Find the user by email
//         const user = await User.findOne({ email: email });
//         console.log(user);
//         if (!user) {
//             // If the user doesn't exist, send an error response
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }
//         // Check if the password matches
//         const passwordMatch = await bcrypt.compare(password, user.password);
//        console.log(passwordMatch);
//         if (!passwordMatch) {
//             // If the password doesn't match, send an error response
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         // If the email and password are correct, generate a JWT token
//         const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

//         // Send a success response along with the token
//         res.json({ message: 'Login successful', token });
//     } catch (error) {
//         // If there's an error during the process, send an error response
//         res.status(500).json({ message: 'Error logging in' });
//     }
// });


app.post('/signup', async (req, res) => {
    try {
        const { fname, lname, email, password } = req.body;

        // Validate required fields
        if (!fname || !lname || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            firstName: fname,
            lastName: lname,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: { email: newUser.email } });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ message: 'Error signing up', error: error.message });
    }
});

app.get('/Students', async (req, res) => {
    try {
      const studentScheduleData = await StudentSchedule.find();
      res.json(studentScheduleData);
    } catch (error) {
      console.error('Error fetching student schedule data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Route to fetch course data
  app.get('/Course', async (req, res) => {
    try {
      const courseData = await Course.find();
      res.json(courseData);
    } catch (error) {
      console.error('Error fetching course data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
// Route to read schedule data from Excel file
app.get('/api/schedules', (req, res) => {
    try{
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

