import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

class NavBar extends React.Component {

  componentDidMount() {
    $('.button-collapse').sideNav();
  }
  render() {
    return (
      <div className="nav-bar">
        <nav>
          <div className="nav-wrapper teal lighten-2">
            <span className="brand-logo center nav-bar-title">ifeedme</span>
            <a href="#" data-activates="mobile" className="button-collapse"><i className="material-icons">menu</i></a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><Link to="dashboard">Dashboard</Link></li>
              <li><Link to="recipes">Recipes</Link></li>
              <li><Link to="meals">Meals</Link></li>
              <li><a onClick={this.props.toggleDrawer}><i className="material-icons">menu</i></a></li>
            </ul>
            <ul className="side-nav" id="mobile">
              <li><Link to="dashboard">Dashboard</Link></li>
              <li><Link to="recipes">Recipes</Link></li>
              <li><Link to="meals">Meals</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
