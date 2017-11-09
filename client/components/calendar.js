import React from 'react';
import axios from 'axios';
import RecipeEntry from './recipe-entry.js';
import MiniRecipe from './recipe-mini.js';
import ShoppingList from './shopping-list.js';
import { Card, CardTitle, Row, Col, Button, Icon } from 'react-materialize';
import { Link, Route } from 'react-router-dom';
import moment from 'moment';
import { setList, setMealPlan } from '../actions/actions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import unitMerger, { commaRemover, parensRemover } from '../utils/ingredientParsers.js';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };

    this.getRandomRecipes = this.getRandomRecipes.bind(this);
    this.getPlannedRecipes = this.getPlannedRecipes.bind(this);
    this.saveMealPlan = this.saveMealPlan.bind(this);
    this.makeShoppingList = this.makeShoppingList.bind(this);
  }

  componentDidMount() {
    if (this.props.mealPlan.length && !this.props.ingredients.length) {
      this.makeShoppingList(this.props.mealPlan);
    } else {
      this.getPlannedRecipes();
    }
  }

  getPlannedRecipes() {
    let userId = this.props.user.user_id;
    return axios.get('/api/mealPlan', {
      params: {userId: userId}
    })
      .then((response) => {
        if (response.data.recipes) {
          this.props.setMealPlan(response.data.recipes);
          this.makeShoppingList(response.data.recipes);
        }
      });
  }

  getRandomRecipes() {
    axios.get('/api/recommended', {
      params: this.props.user.user_id,
      isMealPlan: true
    })
      .then((response) => {
        let listOfFive = response.data.slice(0, 5);
        this.props.setMealPlan(listOfFive);
      });
  }

  saveMealPlan() {
    let mealPlan = {};
    let datedRecipes = this.props.mealPlan.slice();
    datedRecipes.forEach((recipe, index) => {
      if (recipe.date === undefined ) {
        recipe.date = moment().add(index, 'days').format('ddd L');
      }
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
        let nameSansParens = parensRemover(ingredient.name);
        let shortName = commaRemover(nameSansParens);
        let splitIngredient = ingredient.quantity.split(' ');
        let units = splitIngredient[splitIngredient.length - 1].toLowerCase();
        if (units === 'cup' || units === 'tablespoon' || units === 'teaspoon' || units === 'stick') {
          units = splitIngredient[splitIngredient.length - 1] + 's';
          splitIngredient[splitIngredient.length - 1] = units;
        }
        if (list[shortName]) {
          let quantityList = list[shortName].split(', ');
          let isNumber = false;
          let isFraction = false;
          let quantityVal;
          let added = false;
          if (Number(splitIngredient[0])) {
            quantityVal = Number(splitIngredient[0]);
          } else if (splitIngredient[0].split('/').length === 2) {
            let fraction = splitIngredient[0].split('/');
            if (fraction[0].includes('-') || fraction[1].includes('-')) {
              quantityVal = 0;
            } else {
              quantityVal = Number(fraction[0]) / Number(fraction[1]);
            }
          }
          for (var i = 0; i < quantityList.length; i ++) {
            let currentQuantity = quantityList[i].split(' ');
            if (currentQuantity.slice(1).join(' ').toLowerCase() === splitIngredient.slice(1).join(' ').toLowerCase()) {
              if (Number(currentQuantity[0])) {
                let currentNumber = Number(currentQuantity[0]);
                currentQuantity[0] = (currentNumber + quantityVal).toString();
                quantityList[i] = currentQuantity.join(' ');
                added = true;
                break;
              } else if (currentQuantity[0].split('/').length === 2) {
                let currentFraction = currentQuantity[0].split('/');
                if (Number(currentFraction[0]) && Number(currentFraction[1])) {
                  let currentQuantityVal = Number(currentFraction[0]) / Number(currentFraction[1]);
                  currentQuantity[0] = (currentQuantityVal + quantityVal).toString();
                  quantityList[i] = currentQuantity.join(' ');
                  added = true;
                  break;
                }
              }
            }
          }
          if (!added) {
            quantityList.push(splitIngredient.join(' '));
          }
          list[shortName] = quantityList.join(', ');
        } else {
          if (!shortName.toLowerCase().includes('water')) {
            list[shortName] = splitIngredient.join(' ');
          }
        }
      });
    });

    for (var key in list) {
      let entry = {};
      entry.name = key;
      let quantity = list[key].toLowerCase();
      entry.quantity = unitMerger(quantity);
      formattedList.push(entry);
    }
    formattedList.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else {
        return -1;
      }
    });
    this.props.setList(formattedList);
  }

  render() {
    return (
      <div align="center">
        <br />
        <h5 className="calendar-component-title">My Calendar</h5>
        <Row>
          <Col s={0} m={0} l={1} />
          {this.props.mealPlan.length ? this.props.mealPlan.map(((recipe, index) => {
            return (
              <Col s={12} m={5} l={2} key={recipe.algolia}>
                <Card style={{minWidth: '250px'}}
                  className='large hoverable'
                  header={<div className={recipe.date === moment().format('ddd L') ? 'calendar-today' : 'calendar-date'}>
                    {recipe.date ? recipe.date : moment().add(index, 'days').format('ddd L')}</div>} >
                  <MiniRecipe recipe={recipe} key={recipe.algolia} save={this.saveMealPlan}/>
                </Card>
              </Col>
            );
          })) : 'No Meals Planned!'}
          <Col s={0} m={0} l={1} />
        </Row>
        <div className="row">
          <div className="col s1"></div>
          <div className="col s12 m6 l2">
            <Button style={{'marginBottom': '5px'}} waves='light' className='red lighten-3' onClick={this.getRandomRecipes}>Auto Meal Plan<Icon left>cloud</Icon></Button>
          </div>
          <div className="col s12 m6 l2">
            { this.props.ingredients.length
              ? <Link to='/shoppinglist'><Button style={{'marginBottom': '5px'}} waves='light' className='red lighten-3'>Grocery List<Icon left>shopping_cart</Icon></Button></Link>
              : <Button waves='light' className='disabled red lighten-3'>Preparing Your List...<Icon left>shopping_cart</Icon></Button>
            }
          </div>
          <div className="col s12 m6 l2"></div>
          <div className="col s12 m6 l2"></div>
          <div className="col s12 m6 l2">
            <Button waves='light' className='red lighten-3 right' onClick={this.saveMealPlan}>Save<Icon left>save</Icon></Button>
          </div>
          <div className="col s1"></div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.shoppingList,
    mealPlan: state.mealPlan,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setList, setMealPlan }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
