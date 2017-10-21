import React from 'react';
import { Link } from 'react-router-dom';

import SearchBar from './search-bar.js';
import RecipeEntry from './recipe-entry.js';

class Recipes extends React.Component {
  constructor(props) {
    super(props);
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
          <Link to="submit" className="waves-effect waves-light btn"><i className="material-icons left">local_dining</i>Add Your Own!</Link>
        </div>
        <div className="recipe-entries">
          <RecipeEntry />
          <RecipeEntry />
          <RecipeEntry />
          <RecipeEntry />
          <RecipeEntry />
        </div>
      </div>
    );
  }
}

export default Recipes;
