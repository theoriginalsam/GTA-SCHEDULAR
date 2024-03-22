// CoursesList.js
import React from 'react';
import Course from './Course';
import './CoursesList.css';

function CoursesList({ courses }) {
  return (
    <div className="courses-list">
      {courses.map((course) => (
        <Course
          key={course.crn}
          course={course}
        />
      ))}
    </div>
  );
}

export default CoursesList;

