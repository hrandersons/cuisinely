import React from 'react';

class UserProfile extends React.Component {
  render() {
    return (
      <div className="user-profile">
        <div>
          <strong>User Name</strong>
        </div>
        <div>
          <img src="http://lorempixel.com/150/150/people/"/>
        </div>
        <div>
          Level 6
        </div>
        <div>
          and then some user info...
        </div>
      </div>
    );
  }
}

export default UserProfile;
