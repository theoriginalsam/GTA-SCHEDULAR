import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const StudentCard = ({ student }) => (
    <Card variant="outlined" style={{ marginBottom: '20px', background: 'linear-gradient(to right, #64b5f6, #1976d2)',color:"white", }}>
    <CardContent  sx={{ fontWeight: 'bold' }}>
      <Typography sx={{ fontWeight: 'bold' }} variant="h5" component="div">
       {student.studentName}
      </Typography>
      <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1" >
        Courses:
      </Typography >
      <ul >
        {student.courses.map((course, index) => (
          <li key={index}>
            {course.courseCode} - {course.days.join(', ')} - {course.time}
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const CourseCard = ({ course }) => (
    <Card sx={{ fontWeight: 'bold' }} variant="outlined" style={{ marginBottom: '20px', background: 'linear-gradient(to right, #9575cd, #7e57c2)',color:"white", }}>

    <CardContent sx={{ fontWeight: '' }}>
      <Typography sx={{ fontWeight: 'bold' }} variant="h5" component="div">
         {course.courseCode}
      </Typography>
      <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1" >
        {course.courseTitle}
      </Typography>
      <Typography variant="subtitle1" >
        Section: {course.section}
      </Typography>
      <Typography variant="subtitle1" >
        Instructor: {course.instructor}
      </Typography>
      <Typography variant="subtitle1" >
        Days: {course.days.join(', ')}
      </Typography>
      <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1" >
        Timings: {course.timings.map((timing, index) => (
          <span key={index}>
            {timing.startTime} - {timing.endTime}<br />
          </span>
        ))}
      </Typography>
    </CardContent>
  </Card>
);

export { StudentCard, CourseCard };
