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
  SortBy,
  Pagination,
  RefinementList,
  Menu,
  Stats,
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
        <div align="right">
          <Link to="submit" className="waves-effect amber darken-1 btn"><i className="material-icons left">local_dining</i>Add Your Own!</Link>
        </div>

        <InstantSearch
          appId="KUPHP9V5MI"
          apiKey="8e465f8475198ae5cb2d621323e06fb4"
          indexName="allrecipes" >
          <SearchBar />
          <div className="info">
            <Stats />
            <SortBy
              defaultRefinement="allrecipes"
              items={[
                {value: 'allrecipes', label: 'Most Relevant'},
                {value: 'allrecipes_time_asc', label: 'Least Time'},
                {value: 'allrecipes_difficulty_asc', label: 'Easiest'},
              ]}
            />
          </div>

        </InstantSearch>
      </div>

    );
  }
}

//sortby not showing up
export default Recipes;
