import React from 'react';
import axios from 'axios';
import RecipeEntry from './recipe-entry.js';
import MiniRecipe from './recipe-mini.js';
import ShoppingList from './shopping-list.js';
import { Card, CardTitle, Row, Col, Button, Icon } from 'react-materialize';
import { Link, Route } from 'react-router-dom';
import moment from 'moment';
import { setList } from '../actions/actions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      list: []
    };

    this.getRandomRecipes = this.getRandomRecipes.bind(this);
    this.getPlannedRecipes = this.getPlannedRecipes.bind(this);
    this.saveMealPlan = this.saveMealPlan.bind(this);
    this.makeShoppingList = this.makeShoppingList.bind(this);
  }

  // componentWillMount() {
  //   const user = JSON.parse(localStorage.profile);
  //   const userId = user.user_id;
  //   this.setState({
  //     userId: userId
  //   });
  // }

  componentDidMount() {
    this.getPlannedRecipes();
  }

  getPlannedRecipes() {
    let userId = this.props.user.user_id;
    return axios.get('/api/mealPlan', {
      params: {userId: userId}
    })
      .then((response) => {
        if (response.data.recipes) {
          this.setState({
            recipes: response.data.recipes
          });
          this.makeShoppingList(response.data.recipes);
        }
      });
  }

  getRandomRecipes() {
    axios.get('/api/calendarRecipes')
      .then((response) => {
        let listOfFive = response.data.slice(0, 5);
        this.setState({
          recipes: listOfFive
        });
      });
  }

  saveMealPlan() {
    let mealPlan = {};
    let datedRecipes = this.state.recipes.slice();
    datedRecipes.forEach((recipe, index) => {
      recipe.date = moment().add(index, 'days').format('ddd L');
    });
    mealPlan.recipes = datedRecipes;
    mealPlan.startDate = moment().format('dddd L');
    mealPlan.endDate = moment().add(4, 'days').format('dddd L');
    mealPlan.userId = this.props.user.user_id;


    axios.post('/api/mealPlan', mealPlan)
      .then((res) => {
        console.log('Meals saved!');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  makeShoppingList(recipes) {
    let list = {};
    let formattedList = [];
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        if (list[ingredient.name]) {
          list[ingredient.name] += ', ' + ingredient.quantity;
        } else {
          list[ingredient.name] = ingredient.quantity;
        }
      });
    });

    for (var key in list) {
      let entry = {};
      entry.name = key;
      entry.quantity = list[key];
      formattedList.push(entry);
    }
    this.props.setList(formattedList);
  }

  render() {
    return (
      <div align="center">
        <h5 className="component-title">My Calendar</h5>
        <Row>
          <Col s={0} m={0} l={1} />
          {this.state.recipes.length ? this.state.recipes.map(((recipe, index) => {
            return (
              <Col s={12} m={5} l={2} key={recipe._id}>
                <Card style={{minWidth: '200px'}}
                  className='large hoverable'
                  header={<div className={recipe.date === moment().format('ddd L') ? 'calendar-today' : 'calendar-date'}>
                    {recipe.date ? recipe.date : moment().add(index, 'days').format('ddd L')}</div>} >
                  <MiniRecipe recipe={recipe} key={recipe._id} />
                </Card>
              </Col>
            );
          })) : 'No Meals Planned!'}
          <Col s={0} m={0} l={1} />
        </Row>
        <Button style={{'marginRight': '5px'}} waves='light' className='red lighten-3' onClick={this.saveMealPlan}>Save<Icon left>save</Icon></Button>
        <Button style={{'marginLeft': '5px'}} waves='light' className='red lighten-3' onClick={this.getRandomRecipes}>New Meal Plan<Icon left>cloud</Icon></Button>
        <div style={{'marginTop': '10px'}}>
          <Link to='/shoppinglist'>
            <Button waves='light' className='red lighten-3'>Weekly Shopping List<Icon left>shopping_cart</Icon></Button>
          </Link>
        </div>
        {/* {this.state.list.length ? <ShoppingList ingredients={this.state.list}/> : null } */}

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.shoppingList,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setList }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
