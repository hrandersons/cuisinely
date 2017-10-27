import React from 'react';
import RecipeEntry from './recipe-entry.js';
import Bookmarks from './bookmarks.js';
import UserStat from './user-stat.js';
import FeedMeter from './feed-meter.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUserInfo } from '../actions/actions.js';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const name = this.props.user.given_name || this.props.user.name.split('@')[0] || 'User';
    return (
      <div className="container">
        <div className="row" align="center">
          <h5><strong>Welcome {name}! Ready to cook?</strong></h5>
        </div>
        <div className="row" align="center">
          <span><strong>Feed Meter!</strong></span>
          <FeedMeter />
        </div>
        <div className="row">
          <div className="col s12 m12 l6">
            <UserStat />
          </div>
          <div className="col s12 m12 l6">
            <Bookmarks userId={this.props.user.user_id} />
          </div>
        </div>
      </div>
    );
  }
}

//bar chart for progress?
//achievement table
//recommended Recipes
//meals on calendar

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setUserInfo }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
