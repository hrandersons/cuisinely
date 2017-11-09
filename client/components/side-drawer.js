import React from 'react';
import UserProfile from './user-profile.js';

export default class SideDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut() {
    this.props.auth.logout();
    this.props.logout();
  }

  render() {
    return (
      <div className="side-drawer" align="center">
        <a className="waves-effect waves-light btn red lighten-1" onClick={this.handleLogOut}>Log Out</a>
        <UserProfile />
      </div>
    );
  }
}
