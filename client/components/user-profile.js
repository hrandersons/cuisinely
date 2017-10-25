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
    if (localStorage.profile) {
      this.profile = JSON.parse(localStorage.profile);
      this.setState({
        profile: this.profile,
      });
    }
  }

  render() {
    const name = this.state.profile.name.split('@')[0];
    return (
      <div className="row">
        <div className="col s12">
          <div className="card">
            <div className="card-image">
              <img src={this.state.profile.picture} />
            </div>
            <div className="card-content">
              <strong className="profname"> {name} </strong>
              <div> Level 6 | Awesome Chef </div>
              <div> Points Until Next Level: 18pts </div>
              <div className="progress">
                <div className="determinate" style={{'width': '70%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
