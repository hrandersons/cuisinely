import React from 'react';
import RecipeEntry from './recipe-entry.js';
import Bookmarks from './bookmarks.js';
import UserStat from './user-stat.js';
import FeedMeter from './feed-meter.js';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
    };
  }

  componentWillMount() {
    if (localStorage.profile) {
      this.profile = JSON.parse(localStorage.profile);
      this.setState({
        profile: this.profile,
      });
    }
  }

  render() {
    const name = this.state.profile.given_name || this.state.profile.name.split('@')[0];
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
            <Bookmarks userId={this.state.profile.user_id} />
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


export default Dashboard;
