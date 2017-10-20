import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

class NavBar extends React.Component {
  render() {
    return (
      <div className="nav-bar">
        <nav>
          <div className="nav-wrapper teal lighten-2">
            <span className="brand-logo"><span className="nav-bar-logo"><i className="large material-icons">local_dining</i></span><span className="nav-bar-title">ifeedme</span></span>
            <ul id="nav-mobile" className="right hide-on-sm-and-down">
              <li><Link to="dashboard">Dashboard</Link></li>
              <li><Link to="recipes">Recipes</Link></li>
              <li><Link to="meals">Meals</Link></li>
              <li><a onClick={this.props.toggleDrawer}><i className="material-icons">menu</i></a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
