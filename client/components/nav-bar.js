import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

class NavBar extends React.Component {
  render() {
    return (
      <AppBar
        title={<Toolbar>
          <ToolbarGroup>
            <FlatButton label="Dashboard" containerElement={<Link to="dashboard" />}/>
            <FlatButton label="Recipes" containerElement={<Link to="recipes" />}/>
            <FlatButton label="My Meals" containerElement={<Link to="meals" />}/>
          </ToolbarGroup>
        </Toolbar>}
        iconElementLeft={<span className="app-bar-title"><IconButton><i className="material-icons">local_dining</i></IconButton>ifeedme</span>}
        iconElementRight={<IconButton><i className="material-icons">menu</i></IconButton>}
        onRightIconButtonTouchTap={this.props.toggleDrawer}
      >

      </AppBar>
    );
  }
}

export default NavBar;
