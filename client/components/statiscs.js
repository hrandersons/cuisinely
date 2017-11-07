import React from 'react';
import { Preloader, Row, Col} from 'react-materialize';
import UserStats from './user-stats';
import DoughnutChart from './doughnut';
import MyCalendar from './mycalendar.js';
import { connect } from 'react-redux';
import axios from 'axios';
class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.getDataInformation = this.getDataInformation.bind(this);
  }
  componentWillMount() {
    this.getDataInformation();
  }
  getDataInformation() {
    axios.get('/api/user-data/' + this.props.user.user_id)
      .then((res) => {
        let arr = [];
        arr.push(res.data.weeklyPoints.week1.points);
        arr.push(res.data.weeklyPoints.week2.points);
        arr.push(res.data.weeklyPoints.week3.points);
        arr.push(res.data.weeklyPoints.week4.points);
        this.setState({
          data: arr
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="container"> 
      { (this.state.data.length > 0)
       ? <div className="row">
          <UserStats data={this.state.data}/>
          <DoughnutChart />
        </div>
        : <div className="text-center">
            <Preloader size='big' className="text-center"/>
          </div>
      }
        <MyCalendar />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Stats);