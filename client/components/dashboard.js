import React from 'react';
import RecipeEntry from './recipe-entry.js';
import Chart from 'chart.js';
import Bookmarks from './bookmarks.js';

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
          Chart
        </div>
        <div className="row">
          <div className="col s12 m12 l6">
            <div className="card white">
              <div className="card-content black-text">
                <span className="card-title">Achievements</span>
                <table>
                  <thead>
                    <tr>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Achievement 1</td>
                      <td>Achievement 2</td>
                    </tr>
                    <tr>
                      <td>Achievement 3</td>
                      <td>Achievement 4</td>
                    </tr>
                    <tr>
                      <td>Achievement 5</td>
                      <td>Achievement 6</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
