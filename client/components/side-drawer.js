import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

class SideDrawer extends React.Component {
  render() {
    return(
      <Drawer
        openSecondary={true}
        open={true}
      >
        <AppBar title="User Profile" />
        This is a drawer.
      </Drawer>
    )
  }
}

export default SideDrawer;
