import React from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserInfo, setPoints, setLevel } from '../../actions/actions.js';
import { bindActionCreators } from 'redux';

import Auth from '../../Auth/Auth';
import history from './history.js';
import levels from '../../../db/levels';

const auth = new Auth();

import NavBar from './nav-bar.js';
import SideDrawer from './side-drawer.js';
import Dashboard from '../dashboard/dashboard.js';
import Recipes from '../search/recipes.js';
import SubmitRecipe from '../search/submit-recipe.js';
import Meals from '../mealplan/meals.js';
import Login from './login.js';
import Callback from './callback.js';
import RecipeDetails from '../search/recipe-details.js';
import ShoppingList from '../mealplan/shopping-list.js';
import Stats from '../userstats/statistics.js';

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
    };
  }

  componentWillMount() {
    // console.log('Local Storage --> ',localStorage);
    if (auth.isAuthenticated()) { this.getUserInfoFromDb(); }
  }

  getUserInfoFromDb() {
    const user = JSON.parse(localStorage.profile);
    this.props.setUserInfo(user);
    const userId = user.user_id;
    axios.get('/api/user/' + userId)
      .then((res) => {
        this.props.setPoints(res.data.points);
        this.props.setLevel(res.data.level);
        this.setState({
          bookmarks: res.data.bookmarks
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toggleDrawer() {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    });
  }

  handleLogOut() {
    auth.logout();
  }

  renderLogin() {
    return (
      <Switch>
        <Route exact path='/' render={(props) => (<Login auth={auth} {...props} />)} />)} />
        <Route path='/login' render={(props) => (<Login auth={auth} {...props} />)} />)} />
        <Route path='/callback' render={(props) => (<Callback {...props} />)} />)} />
      </Switch>
    );
  }

  renderApp() {
    return (
      <div>
        <NavBar toggleDrawer={this.toggleDrawer} auth={auth} logOut={this.handleLogOut}/>
        <Switch>
          <Route path='/dashboard' render={(props) => (<Dashboard {...props} />)} />
          <Route exact path='/recipes' render={(props) => (<Recipes {...props} />)} />
          <Route path='/recipes/:recipeId' render={(props) => (<RecipeDetails {...props} />)} />
          <Route path='/meals' render={(props) => (<Meals {...props} />)} />
          <Route path='/submit' render={(props) => (<SubmitRecipe {...props} />)} />
          <Route path='/shoppinglist' render={(props) => (<ShoppingList {...props} />)} />
          <Route path='/user-stats' render={(props) => (<Stats {...props} />)} />
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
    points: state.points,
    level: state.level
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setUserInfo, setPoints, setLevel }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
