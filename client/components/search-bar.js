import React from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  RefinementList,
  SortBy,
  Pagination,
  Stats
} from 'react-instantsearch/dom';
import algoliasearch from 'algoliasearch';
import RecipeEntry from './recipe-entry.js';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookmarked: false,
    };
  }

  render() {
    return (
      <div>
        <SearchBox />
        <Hits hitComponent={RecipeEntry} />
        <div className="pagination">
          <Pagination showlast/>
        </div>
      </div>

    );
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(SearchBar);
