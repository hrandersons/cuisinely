import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    console.log('Im pressed');
  }

  render() {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="login-title"> Welcome to ifeedme!</div>
          <form onSubmit={this.handleLogin}>
            <div className="row">
              <div className="input-field col s12">
                <input id="email" type="email" className="validate" />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password" type="password" className="validate" />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.handleLogin}>
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
