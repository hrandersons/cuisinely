import React from 'react';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
    };
    this.getProfile = this.getProfile.bind(this);
  }

  componentWillMount() {
    this.getProfile();
  }

  getProfile() {
    this.profile = localStorage.getItem('profile');
    this.setState({
      profile: this.profile,
    });
    console.log(this.profile);
  }

  render() {
    return (
      <div className="user-profile container">
        <div>
          <strong> {localStorage.profile.name} </strong>
        </div>
        <div>
          <img className="responsive-img circle" src={localStorage.profile.picture} />
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
