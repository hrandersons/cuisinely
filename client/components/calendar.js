import React from 'react';
import axios from 'axios';
import RecipeEntry from './recipe-entry.js';

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
        this.setState({
          recipes: response.data
        });
      });
  }

  componentDidMount() {
    this.getRandomRecipes();
  }

  render() {
    return (
      <div>
        <h1>Calendar Goes Here</h1>
        <div>
          {this.state.recipes.map((recipe) => { return <RecipeEntry recipe={recipe} key={recipe._id}/>; })}
        </div>
      </div>
    );
  }
}
