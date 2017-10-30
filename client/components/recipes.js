import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import SearchBar from './search-bar.js';
import RecipeEntry from './recipe-entry.js';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
} from 'react-instantsearch/dom';
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
        <h5 className="component-title">Recipes</h5>
        <strong>Trending Keywords:</strong> <a href="#">Ramen</a>, <a href="#">Ramen</a>, <a href="#">Ramen</a>, <a href="#">Ramen</a>

        <InstantSearch
          appId="KUPHP9V5MI"
          apiKey="8e465f8475198ae5cb2d621323e06fb4"
          indexName="recipes">
          <SearchBar />
        </InstantSearch>
      </div>

    );
  }
}

export default Recipes;
