import React from 'react';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      picture: null,
    };
    console.log(localStorage.profile);
    // this.getProfile = this.getProfile.bind(this);
  }

  componentWillMount() {
    this.setState({
      name: localStorage.profile.name,
      picture: localStorage.profile.picture,
    });
  }

  // getProfile() {
  //   this.setState({
  //     name: localStorage.profile.name,
  //     picture: localStorage.profile.picture,
  //
  //   })
  // }

  render() {
    return (
      <div className="user-profile container">
        <div>
          <strong>Name: {this.state.name}</strong>
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
