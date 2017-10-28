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
  Pagination
} from 'react-instantsearch/dom';
import algoliasearch from 'algoliasearch';
import RecipeEntry from './recipe-entry.js';

var client = algoliasearch('KUPHP9V5MI', '8e465f8475198ae5cb2d621323e06fb4');
var index = client.initIndex('recipes');

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    this.state = {
      bookmarked: false,
    };
  }

  render() {
    return (
      <div>
        <SearchBox />
        <Hits hitComponent={RecipeEntry} />
      </div>

    );
  }
}

// const Content = () =>
// <div className="content">
//   <div className="info">
//     <SortBy
//       defaultRefinement="instant_search"
//       items={[
//         {value:'instant_search', label:'Most Relevant'},
//         {value:'instant_search_price_asc', label:'Lowest Price'},
//         {value:'instant_search_price_desc', label:'Highest Price'}
//       ]}
//       />
//   </div>
//   <div className="pagination">
//     <Pagination showlast/>
//   </div>
// </div>

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(SearchBar);
