import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import Auth from '../Auth/Auth.js';
import { Navbar, Button } from 'react-bootstrap';

// const  lock  = new Auth0Lock('sNfZXyIkcjg3QZve68HJXoGfzFVZgjE4','ifeedme.auth0.com');
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.checkLoggedIn = this.checkLoggedIn.bind(this);
  }

  handleLogin() {
    // this.auth.login();
    this.props.auth.login();
  }


  checkLoggedIn() {
    // console.log('LoggedIn  --> ',this.auth.loggedIn());
    // console.log('This auth --> ',this.auth);
    console.log('It works --> ', this.props.auth.loggedIn());
  }

  // render() {
  //   //const auth = new Auth();
  //  // auth.login();
  //   return (
  //   );
  // }
  render() {
    // const { isAuthenticated } = this.props.auth;
    // console.log('is isAuthenticated --> ', isAuthenticated);
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


/*<div className="login-page">
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
  
      </div>*/