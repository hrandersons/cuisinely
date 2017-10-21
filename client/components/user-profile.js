import React from 'react';

class UserProfile extends React.Component {
  render() {
    return (
      <div className="user-profile container">
        <div>
          <strong>User Name</strong>
        </div>
        <div>
          <img className="responsive-img circle" src="http://lorempixel.com/150/150/people/"/>
        </div>
        <div>
          <span>Level 6 | Awesome Chef</span>
        </div>
        <div>
          and then some user info...
        </div>
      </div>
    );
  }
}

export default UserProfile;
