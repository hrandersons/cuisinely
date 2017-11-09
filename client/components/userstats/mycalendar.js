import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
require('react-big-calendar/lib/css/react-big-calendar.css');
// or globalizeLocalizer

export default class MyCalendar extends React.Component {
  constructor(props) {
    super(props);

    BigCalendar.momentLocalizer(moment);
    BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
    this.eventSelected = this.eventSelected.bind(this);
    this.eventStyleGetter = function(event, start, end, isSelected) {
      var style = {
        backgroundColor: '#ef5350',
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      };
      return {
        style: style
      };
    };
    this.events = this.props.meals.reduce((acc, el) => {
      let startDate = moment(el.date + ' 13:00:00').format('LLL');
      let endDate = moment(el.date + ' 13:00:00').add(1, 'hour').format('LLL');
      acc.push({ 'title': el.name, 'startDate': startDate, 'endDate': endDate});
      return acc;
    }, []);
  }

  eventSelected(e) {
    this.props.handleView(e);
  }

  render() {
    return (
      <div id="mycalendar">
        <BigCalendar
          events={this.events}
          views = {['month', 'day', 'agenda']}
          defaultView='month'
          startAccessor='startDate'
          endAccessor='endDate'
          onSelectEvent={(this.eventSelected)}
          eventPropGetter={(this.eventStyleGetter)}
        />
      </div>
    );
  }
}
