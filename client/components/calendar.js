import React from 'react';
import axios from 'axios';
import RecipeEntry from './recipe-entry.js';
import MiniRecipe from './recipe-mini.js';
import { Card, CardTitle, Row, Col } from 'react-materialize';
import moment from 'moment';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };

    this.getRandomRecipes = this.getRandomRecipes.bind(this);

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

  componentDidMount() {
    this.getRandomRecipes();
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
                <Card className='large hoverable' header={<CardTitle className='teal lighten-2'>Day {index + 1}</CardTitle>} >
                  <MiniRecipe recipe={recipe} key={recipe._id} />
                </Card>
              </Col>
            );
          })) : 'No Meals Planned!'}
          <Col m={1}></Col>
        </Row>
      </div>
    );
  }
}
