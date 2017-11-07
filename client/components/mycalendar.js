import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
require('react-big-calendar/lib/css/react-big-calendar.css');
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const MyCalendar = props => (
  <div id="mycalendar">
    <BigCalendar
      events={[]}
      startAccessor='startDate'
      endAccessor='endDate'
    />
  </div>
)




export default MyCalendar