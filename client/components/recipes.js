import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import SearchBar from './search-bar.js';
import RecipeEntry from './recipe-entry.js';

class Recipes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: []
    };

  }

  componentDidMount() {
    this.getAllRecipes();
  }

  getAllRecipes() {
    axios.get('/api/recipes')
      .then((res) => {
        this.setState({
          recipes: res.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="container">
        <h4 className="component-title">Recipes</h4>
        <div>
          <SearchBar />
          <strong>Trending Keywords:</strong> <a href="#">Ramen</a>, <a href="#">Ramen</a>, <a href="#">Ramen</a>, <a href="#">Ramen</a>
        </div>
        <div align="right">
          <Link to="submit" className="waves-effect amber darken-1 btn"><i className="material-icons left">local_dining</i>Add Your Own!</Link>
        </div>
        <div className="recipe-entries">
          {
            (!this.state.recipes.length)
              ? <span> Loading Recipes... </span>
              : this.state.recipes.map(recipe => <RecipeEntry recipe={recipe} key={recipe._id} />)
          }
        </div>
      </div>
    );
  }
}

export default Recipes;
