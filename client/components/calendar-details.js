import React from 'react';
import { Button } from 'react-materialize';
export default class CalendarDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    console.log('Props --> ', this.props);
    return (
      <div className="popup">
        <h5 className="text-center"> Calendar Details</h5>
        <ul>
          <li>Title: {this.props.event.title} </li>
          <li> Date: {this.props.event.startDate} </li>
        </ul>
        <Button floating small className='yellow' waves='light' icon='close' onClick={this.props.onClose}/>
      </div>
    );
  }
}