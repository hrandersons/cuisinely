import React from 'react';
import UserStats from './user-stats';
import DoughnutChart from './doughnut';
import MyCalendar from './mycalendar.js';

class Stats extends React.Component {
constructor(props) {
  super(props);
}
render() {
  return (
     <div className="container"> 
        <div className="row">
          <UserStats />
          <DoughnutChart />
        </div>
        <MyCalendar />
      </div>
    )
  }
}

export default Stats