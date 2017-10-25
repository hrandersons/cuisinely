import React from 'react';
import axios from 'axios';
import RecipeEntry from './recipe-entry.js';
import MiniRecipe from './recipe-mini.js';
import { Card, CardTitle, Row, Col, Button, Icon } from 'react-materialize';
import moment from 'moment';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      userId: ''
    };

    this.getRandomRecipes = this.getRandomRecipes.bind(this);
    this.getPlannedRecipes = this.getPlannedRecipes.bind(this);
    this.saveMealPlan = this.saveMealPlan.bind(this);
  }

  componentWillMount() {
    const user = JSON.parse(localStorage.profile);
    const userId = user.user_id;
    this.setState({
      userId: userId
    });
  }

  componentDidMount() {
    this.getPlannedRecipes();
  }

  getPlannedRecipes() {
    let userId = this.state.userId;
    axios.get('/api/mealPlan', {
      params: {userId: userId}
    })
      .then((response) => {
        if (response.data.recipes) {
          this.setState({
            recipes: response.data.recipes
          });
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
    mealPlan.recipes = this.state.recipes;
    mealPlan.startDate = moment().format('dddd L');
    mealPlan.endDate = moment().add(4, 'days').format('dddd L');
    mealPlan.userId = this.state.userId;


    axios.post('/api/mealPlan', mealPlan)
      .then((res) => {
        console.log('Meals saved!');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        <h2>My Calendar</h2>
        <Row>
          <Col m={1}></Col>
          {this.state.recipes.length ? this.state.recipes.map(((recipe, index) => {
            return (
              <Col m={2}>
                <Card className='large hoverable' header={<CardTitle className='red lighten-3'>{moment().add(index, 'days').format('dddd L')}</CardTitle>} >
                  <MiniRecipe recipe={recipe} key={recipe._id} />
                </Card>
              </Col>
            );
          })) : 'No Meals Planned!'}
          <Col m={1}></Col>
        </Row>
        <Button waves='light' className='red lighten-3' onClick={this.saveMealPlan}>Save<Icon left>save</Icon></Button>
        <Button waves='light' className='red lighten-3' onClick={this.getRandomRecipes}>New Meal Plan<Icon left>cloud</Icon></Button>
      </div>
    );
  }
}
