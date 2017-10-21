import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {teal300, grey900} from 'material-ui/styles/colors';
import Auth from '../Auth/Auth';
import history from '../history';
import Callback from '../Callback/Callback';
import Home from '../Home/Home';


const handleAuthentication = (nextState, replace) => {
  console.log('It is inside of handleAuthentication');
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

import NavBar from './nav-bar.js';
import SideDrawer from './side-drawer.js';
import Dashboard from './dashboard.js';
import Recipes from './recipes.js';
import Meals from './meals.js';
import Login from './login.js';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.muiTheme = getMuiTheme({
      palette: {
        primaryColor: teal300,
        textColor: grey900,
      },
      appBar: {
        height: 50,
        textColor: grey900,
        color: teal300
      },
      toolbar: {
        backgroundColor: teal300,
      }
    });

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.renderApp = this.renderApp.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.auth = new Auth('sNfZXyIkcjg3QZve68HJXoGfzFVZgjE4', 'ifeedme.auth0.com', () => {
      console.log('It worked, AUthonticated');
      this.setState({
        isLoggedIn: true
      });
    });
    this.state = {
      drawerOpen: false,
      isLoggedIn: this.auth.loggedIn()
    };
  }

  toggleDrawer() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  renderLogin() {
    return (
      <MuiThemeProvider>
        <Switch>
          <Route path='/login' render={props => (<Login auth={this.auth} {...props} />)} />)} />
          <Route path="/home" render={(props) => <Home auth={this.auth} {...props} />} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />; 
          }}/>
          <Redirect to='/login' />
        </Switch>
      </MuiThemeProvider>
    );
  }

  renderApp() {
    return (
      <MuiThemeProvider muiTheme={this.muiTheme}>
        <div>
          <NavBar toggleDrawer={this.toggleDrawer}/>
          <Switch>
            <Route path='/dashboard' render={props => (<Dashboard {...props} />)} />
            <Route path='/recipes' render={props => (<Recipes {...props} />)} />
            <Route path='/meals' render={props => (<Meals {...props} />)} />
            <Redirect to='/dashboard' />
          </Switch>
          <SideDrawer drawerOpen={this.state.drawerOpen} toggleDrawer={this.toggleDrawer}/>
        </div>
      </MuiThemeProvider>
    );
  }


  render() {

    return ( this.state.isLoggedIn ) ? (
      this.renderApp()
    ) : (
      this.renderLogin()
    );
  }


}

export default App;
