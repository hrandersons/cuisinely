import React from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Auth from '../Auth/Auth';
import history from './history.js';

const auth = new Auth();

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
    this.handleLogOut = this.handleLogOut.bind(this);

    this.state = {
      drawerOpen: false,
      bookmarks: [],
      points: 0
    };
  }

  componentDidMount() {
    if (auth.isAuthenticated()) { this.getUserInfoFromDb(); }
  }

  getUserInfoFromDb() {
    const user = JSON.parse(localStorage.profile);
    const userId = user.user_id;
    axios.get('/api/user/' + userId)
      .then((res) => {
        this.setState({
          bookmarks: res.data.bookmarks,
          points: res.data.points
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toggleDrawer() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  handleLogOut() {
    auth.logout();
  }

  renderLogin() {
    return (
      <Switch>
        <Route exact path='/' render={props => (<Login auth={auth} {...props} />)} />)} />
        <Route path='/login' render={props => (<Login auth={auth} {...props} />)} />)} />
      </Switch>
    );
  }

  renderApp() {
    return (
      <div>
        <NavBar toggleDrawer={this.toggleDrawer} auth={auth} logOut={this.handleLogOut}/>
        <Switch>
          <Route path='/dashboard' render={props => (<Dashboard {...props} />)} />
          <Route exact path='/recipes' render={props => (<Recipes {...props} />)} />
          <Route path='/recipes/:recipeId' render={props => (<RecipeDetails {...props} />)} />
          <Route path='/meals' render={props => (<Meals {...props} />)} />
          <Route path='/submit' render={props => (<SubmitRecipe {...props} />)} />
          <Redirect to='/dashboard' />
        </Switch>
      </div>
    );
  }


  render() {
    const { isAuthenticated } = auth;

    return ( isAuthenticated() ) ? (
      this.renderApp()
    ) : (
      this.renderLogin()
    );
  }


}

export default App;
