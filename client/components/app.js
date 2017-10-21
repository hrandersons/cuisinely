import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';


import Auth from '../Auth/Auth';
import AuthKeys from '../Auth/Auth_keys';
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
import SubmitRecipe from './submit-recipe.js';
import Meals from './meals.js';
import Login from './login.js';
import RecipeDetails from './recipe-details.js';



class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.renderApp = this.renderApp.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.auth = new Auth(AuthKeys.clientId, AuthKeys.domain, () => {
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
      <Switch>
        <Route path='/login' render={props => (<Login auth={this.auth} {...props} />)} />)} />
        <Route path="/home" render={(props) => <Home auth={this.auth} {...props} />} />
        <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} />; 
        }}/>
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
          <Route path='/details' render={props => (<RecipeDetails {...props} />)} />
          <Route path='/submit' render={props => (<SubmitRecipe {...props} />)} />
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
