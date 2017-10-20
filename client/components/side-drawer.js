import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

import UserProfile from './user-profile.js';

class SideDrawer extends React.Component {
  render() {
    return(
      <Drawer
        openSecondary={true}
        open={this.props.drawerOpen}
      >
        <AppBar onLeftIconButtonTouchTap={this.props.toggleDrawer}/>
        <UserProfile/>
      </Drawer>
    )
  }
}

export default SideDrawer;
