// Course.js
import React from 'react';
import './Course.css';

const Course = ({ course }) => {
  return (
    <div className="course-card">
      <div className="course-header">
        <span className="course-title">{course.course} - {course.title}</span>
        <span className="course-term">{course.term}</span>
      </div>
      <div className="course-body">
        <p><strong>Instructor:</strong> {course.instructor}</p>
        <p><strong>Time:</strong> {course.days} {course.time}</p>
        <p><strong>TAs:</strong> {course.TAs} TAs</p>
        <p><strong>Students:</strong> {course.students} students</p>
      </div>
    </div>
  );
};

export default Course;
