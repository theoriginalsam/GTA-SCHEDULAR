import React, { useEffect, useState } from 'react';
import { Typography, ThemeProvider, createTheme, Button } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
    },
});

function MatchedTA() {
    const [matchedTAs, setMatchedTAs] = useState({});
    const [selectedCourse, setSelectedCourse] = useState('');
    const [showAll, setShowAll] = useState(false);

    const fetchMatchedTAs = async () => {
        try {
            const response = await fetch('http://localhost:5000/matchedTA');
            if (!response.ok) {
                throw new Error('Failed to fetch matched TAs');
            }
            const data = await response.json();
            setMatchedTAs(data);
        } catch (error) {
            console.error('Error fetching matched TAs:', error);
        }
    };

    useEffect(() => {
        fetchMatchedTAs();
    }, []);

    const handleCourseChange = (event) => {
        setSelectedCourse(event.target.value);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <ThemeProvider theme={theme}>
            <div style={{ 
                backgroundColor: '#f0f0f0', 
                padding: '20px', 
                margin: '20px', 
                borderRadius: '10px', 
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', 
                background: 'linear-gradient(135deg, #ffffff, #e0e0e0)',
                '@media print': {
                    display: 'block',
                }
            }}>
                <Typography variant="h4" gutterBottom style={{ marginBottom: '8px', marginLeft: '5px' }}>Matched TAs</Typography>
                <Typography variant="body1" gutterBottom>Please select a course:</Typography>
                <select onChange={handleCourseChange} value={selectedCourse} style={{ marginBottom: '20px', padding: '8px', borderRadius: '5px' }}>
                    <option value="">Select a course</option>
                    {Object.keys(matchedTAs).map(courseCode => (
                        <option key={courseCode} value={courseCode}>{courseCode}</option>
                    ))}
                </select>
                <Button variant="contained" onClick={() => setShowAll(!showAll)} style={{ marginBottom: '8px', marginLeft: '5px' }}>Show All Lists</Button>
                {selectedCourse && !showAll && (
                    <div style={{ backgroundColor: '#ffffff', padding: '15px', borderRadius: '8px', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
                        <Typography variant="h6" gutterBottom style={{ marginBottom: '10px' }}>Assigned TAs for {selectedCourse}</Typography>
                        <ul style={{ paddingInlineStart: '20px' }}>
                            {matchedTAs[selectedCourse].map((ta, index) => (
                                <li key={index}>{ta}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {showAll && (
                    <div>
                        {Object.keys(matchedTAs).map(courseCode => (
                            <div key={courseCode} style={{ backgroundColor: '#ffffff', padding: '15px', borderRadius: '8px', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
                                <Typography variant="h6" gutterBottom style={{ marginBottom: '10px' }}>Assigned TAs for {courseCode}</Typography>
                                <ul style={{ paddingInlineStart: '20px' }}>
                                    {matchedTAs[courseCode].map((ta, index) => (
                                        <li key={index}>{ta}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
                <Button style={{ marginBottom: '8px', marginLeft: '5px' }} variant="contained" onClick={handlePrint}>Print List</Button>
            </div>
        </ThemeProvider>
    );
}

export default MatchedTA;
