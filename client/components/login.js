import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
  }

  login() {
    this.props.auth.login();
  }

  render() {
    return (
      <div className="login-page">
        <div className="row">
          <div className="col s12">
            <div className="card white">
              <div className="card-content blue-text">
                <span className="card-title landing-title">Welcome to ifeedme!</span>
              </div>
              <div className="card-action landing">
                <strong><a
                  style={{ cursor: 'pointer' }}
                  className="waves-effect red lighten-1 btn"
                  onClick={this.login}
                >
                Log In/Sign Up
                </a></strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
