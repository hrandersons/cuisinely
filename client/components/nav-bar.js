import React from 'react';
import { Link } from 'react-router-dom';

import SideDrawer from './side-drawer.js';

class NavBar extends React.Component {

  componentDidMount() {
    $('.button-collapse').sideNav({ closeOnClick: true });
    $('.button-profile').sideNav({
      edge: 'right',
      closeOnClick: true
    });
  }
  render() {
    return (
      <div className="nav-bar">
        <nav>
          <div className="nav-wrapper teal lighten-2">
            <span className="brand-logo center nav-bar-title">ifeedme</span>
            <a data-activates="mobile" className="button-collapse">
              <i className="material-icons">menu</i>
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <Link to="dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="recipes">Recipes</Link>
              </li>
              <li>
                <Link to="meals">Meals</Link>
              </li>
              <li>
                <a data-activates="profile" className="button-profile">
                  <i className="material-icons">person</i>
                </a>
              </li>
            </ul>
            <ul className="side-nav" id="profile">
              <li><SideDrawer/></li>
            </ul>
            <ul className="side-nav" id="mobile">
              <li>
                <a className="waves-effect waves-light btn red lighten-1" onClick={this.handleLogOut}>Log Out</a>
              </li>
              <li>
                <Link to="dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="recipes">Recipes</Link>
              </li>
              <li>
                <Link to="meals">Meals</Link>
              </li>
            </ul>

          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
