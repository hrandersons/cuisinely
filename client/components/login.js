import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  login() {
    this.props.auth.login();
  }

  render() {
    return (
      <div className="login-container">
        <div className="row">
          <div className="col s12">
            <div className="card white">
              <div className="card-content blue-text">
                <span className="card-title landing-title">Welcome to ifeedme!</span>
              </div>
              <div className="card-action landing">
                <strong><a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In or Sign Up
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
