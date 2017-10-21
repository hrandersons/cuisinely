import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="login-page">
        <div>
          {this.props.auth.login()}
      </div>
    </div>
    );
  }
}

export default Login;
