import React from 'react';
import RecipeEntry from './recipe-entry.js';
import Chart from 'chart.js';
import Bookmarks from './bookmarks.js';

class Dashboard extends React.Component {
  render() {
    return (

      <div className="row">
        <p className="title">
          Welcome User! Ready to cook?
        </p>
        <div className="col s12 m6">
          <div className="card grey lighten-2">
            <div className="card-content black-text">
              <span className="card-title">Recommended Recipes</span>
            </div>
            <div className="card-action">
              <a href="#">Explore</a>
            </div>
          </div>

          <Bookmarks />
        </div>
        <div className="col s12 m6">
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
      </div>
    );
  }
}

//bar chart for progress?
//achievement table
//recommended Recipes
//meals on calendar


export default Dashboard;
