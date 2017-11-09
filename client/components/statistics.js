import React from 'react';
import { Preloader, Row, Col} from 'react-materialize';
import UserStats from './user-stats';
import DoughnutChart from './doughnut';
import MyCalendar from './mycalendar.js';
import { connect } from 'react-redux';
import axios from 'axios';
import Modal from 'react-modal';
import CalendarDetails from './calendar-details.js';

class Stats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      mealPlan: [],
      openView: false,
      eventDetails: {},
      mealPlanCheck: false
    };

    this.getDataInformation = this.getDataInformation.bind(this);
    this.getMealPlans = this.getMealPlans.bind(this);
    this.handleView = this.handleView.bind(this);
  }

  componentWillMount() {
    this.getDataInformation();
    this.getMealPlans();
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

  getMealPlans() {
    let userId = this.props.user.user_id;
    axios.get('/api/mealPlan', {
      params: {userId: userId}
    })
      .then((response) => {
        // let listOfFive = response.data.slice(0, 5);
        // this.props.setMealPlan(listOfFive);
        let data = (!response.data.recipes) ? [] : response.data.recipes.reduce((acc, el) => {
          acc.push({ name: el.name, date: el.date});
          return acc;
        }, []);
        this.setState({
          mealPlan: data,
          mealPlanCheck: true
        });
      })
      .catch((err) => {
        console.log('Error --> ', err);
      });
  }

  handleView(event) {
    this.setState({
      openView: !this.state.openView,
      eventDetails: event
    });
  }

  render() {
    let customStyles = {
      content: {
        position: 'relative',
        border: '1px solid #ccc',
        background: 'white',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px'
      }
    };
    return (
      <div className="container">
        <Modal className="modalContainer"
          isOpen={this.state.openView}
          onRequestHide={this.handleView}
          style={customStyles}
          onClose={this.handleView}
        >
          <CalendarDetails event={this.state.eventDetails} onClose={this.handleView}/>
        </Modal>
        { (this.state.data.length > 0 && this.state.mealPlanCheck)
          ? <div>
            <div className="text-center">
              <UserStats data={this.state.data}/>
            </div>
            <MyCalendar meals={this.state.mealPlan} handleView={this.handleView}/>
          </div>
          : <div className="text-center">
            <Preloader size='big' className="text-center"/>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    mealPlan: state.mealPlan
  };
};

export default connect(mapStateToProps)(Stats);
