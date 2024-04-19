

// Dashboard.js

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { StudentCard, CourseCard } from "./Cards";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

function Dashboard() {
  const [studentScheduleData, setStudentScheduleData] = useState([]);
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    // Fetch student schedule data from backend API
    const fetchStudentScheduleData = async () => {
      try {
        const response = await fetch("http://localhost:5000/Students");
        if (!response.ok) {
          throw new Error("Failed to fetch student schedule data");
        }
        const data = await response.json();
        setStudentScheduleData(data);
      } catch (error) {
        console.error("Error fetching student schedule data:", error);
      }
    };

    // Fetch course data from backend API
    const fetchCourseData = async () => {
      try {
        const response = await fetch("http://localhost:5000/Course");
        if (!response.ok) {
          throw new Error("Failed to fetch course data");
        }

        const data = await response.json();
        console.log(data);
        setCourseData(data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchStudentScheduleData();
    fetchCourseData();
  }, []);

  return (
    <>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#f0f0f0",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ color: "#333", fontWeight: "bold", margin: "0" }}>
          Welcome to the Dashboard
        </h1>
      </div>

      <div className="dashboard">
        <div className="section">
          <h2>Available TAs</h2>
          <div className="section">
      
      <div className="student-schedule">
        {studentScheduleData.map((student, index) => (
          (index % 4 === 0) && (
            <div key={`row_${index}`} style={{ display: 'flex', overflowX: 'auto', gap: '15px', padding: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              {studentScheduleData.slice(index, index + 4).map((studentItem) => (
                <div key={studentItem._id} style={{ flex: '0 0 auto', position: 'relative' }}>
                  <StudentCard student={studentItem} />
                  <button onClick={() => handleDeleteTA(studentItem._id)} style={{ position: 'absolute', top: '5px', right: '5px', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <DeleteIcon />
                  </button>
                </div>
              ))}
            </div>
          )
        ))}
      </div>
    </div>

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Link to="/addTA" style={{ textDecoration: "none" }}>
              <button
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Add TA
              </button>
            </Link>
          </div>
        </div>

        <div className="section">
          <h2>Courses</h2>
          <div className="course-list">
            {courseData.map(
              (course, index) =>
                index % 5 === 0 && (
                  <div
                    key={`row_${index}`}
                    style={{
                      display: "flex",
                      overflowX: "auto",
                      gap: "15px",
                      padding: "10px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {courseData.slice(index, index + 5).map((courseItem) => (
                      <div
                        key={courseItem._id}
                        style={{ position: "relative" }}
                      >
                        <CourseCard
                          course={courseItem}
                          style={{ flex: "0 0 auto" }}
                        />
                        <button
                          onClick={() => handleDelete(courseItem._id)}
                          style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    ))}
                  </div>
                )
            )}
          </div>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Link to="/addCourse" style={{ textDecoration: "none" }}>
              <button
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Add Course
              </button>
            </Link>
          </div>
        </div>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Link to="/matchedTA" style={{ textDecoration: "none" }}>
            <button
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                fontWeight: "bold",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Match Classes and TA
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
