// Dashboard.js

import React from 'react';
import Header from './Header';
import Filters from './Filters';
import Instructions from './Instructions';
import Courses from './Courses';
import Breaks from './Breaks';
import Schedules from './Schedules';

function Dashboard() {
  return (
    <div className="dashboard">
      <Header />
      <Filters />
      <Instructions />
      <div className="course-and-breaks">
        <Courses />
        <Breaks />
      </div>
      <Schedules />
    </div>
  );
}

export default Dashboard;
