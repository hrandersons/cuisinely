import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
            <h4>
              Welcome to ifeedme!
            </h4>
          )
        }
        {
          !isAuthenticated() && (
            <h4>
              Welcome to ifeedme! Please{' '}
              <a
                style={{ cursor: 'pointer' }}
                onClick={this.login.bind(this)}
              >
                Log In
              </a>
              {' '}to continue.
            </h4>
          )
        }
      </div>
    );
  }
}

export default Login;
