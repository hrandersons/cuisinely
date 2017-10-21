import React from 'react';
// import TextField from 'material-ui/TextField';
// import RaisedButton from 'material-ui/RaisedButton';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import Auth from '../Auth/Auth.js';
import { Navbar, Button } from 'react-bootstrap';


class Login extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.handleLogin = this.handleLogin.bind(this);
  // }

  // handleLogin() {
  //   console.log('Im pressed');
  // }

  // render() {
  //   //const auth = new Auth();
  //  // auth.login();
  //   return (
  //   );
  // }
  goTo(route) {
    //this.props.history.replace('/${route}');
    this.props.logging();
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
     const { isAuthenticated } = this.props.auth;
     console.log('is isAuthenticated --> ',isAuthenticated);
    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Auth0 - React</a>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </Button>
            {
              !isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </Button>
                )
            }
          </Navbar.Header>
        </Navbar>
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