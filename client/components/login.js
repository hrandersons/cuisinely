import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
          <MuiThemeProvider>
            <div className="login-title"> Welcome to IfeedMe</div>
            <TextField hintText="Enter your Username" floatingLabelText="Username" />
            <br/>
            <TextField type="password" hintText="Enter your password" floatingLabelText="Password" />
            <br/>
            <RaisedButton label="Log In" primary={true} onClick={this.handleLogin} />
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default Login;