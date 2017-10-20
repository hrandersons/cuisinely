import React from 'react';

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
          <a className="waves-effect waves-light btn"><i className="material-icons left">local_dining</i>Add Your Own!</a>
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
