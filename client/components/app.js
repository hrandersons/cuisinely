import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import NavBar from './nav-bar.js';
import SideDrawer from './side-drawer.js';
import Dashboard from './dashboard.js';
import Recipes from './recipes.js';
import Meals from './meals.js';
import Login from './login.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      isLoggedIn: true
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.renderApp = this.renderApp.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
  }

  toggleDrawer() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  renderLogin() {
    return (
      <Switch>
        <Route path='/login' render={props => (<Login {...props} />)} />)} />
        <Redirect to='/login' />
      </Switch>
    );
  }

  renderApp() {
    return (
      <div>
        <NavBar toggleDrawer={this.toggleDrawer}/>
        <Switch>
          <Route path='/dashboard' render={props => (<Dashboard {...props} />)} />
          <Route path='/recipes' render={props => (<Recipes {...props} />)} />
          <Route path='/meals' render={props => (<Meals {...props} />)} />
          <Redirect to='/dashboard' />
        </Switch>
      </div>
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
