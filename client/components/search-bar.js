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

    this.state = {
      bookmarked: false,
    };
    this.checkBookmarks = this.checkBookmarks.bind(this);
    this.handleAddBookmark = this.handleAddBookmark.bind(this);
    this.handleRemoveBookmark = this.handleRemoveBookmark.bind(this);
  }
  componentDidMount() {
    this.checkBookmarks();
  }

  checkBookmarks() {
    console.log(this.props);
    const userId = this.props.user.user_id;
    // const { hit } = this.props;
    // const params = {
    //   recipeId: hit.objectID,
    //   userId: userId
    // };
    //
    // axios.get('/api/bookmarks/check', { params: params })
    //   .then((res) => {
    //     this.setState({
    //       bookmarked: res.data
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  handleAddBookmark() {
    // const userId = this.props.user.user_id;
    // const { hit } = this.props;
    // const params = {
    //   recipeId: hit.objectID,
    //   userId: userId
    // };
    // axios.put('/api/bookmarks', params)
    //   .then((res) => {
    //     console.log('bookmarked');
    //     this.setState({
    //       bookmarked: true
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  handleRemoveBookmark() {
    // const userId = this.props.user.user_id;
    // const { hit } = this.props;
    // const params = {
    //   recipeId: hit.objectID,
    //   userId: userId
    // };
    // axios.delete('/api/bookmarks', { params: params })
    //   .then((res) => {
    //     console.log('removed');
    //     this.setState({
    //       bookmarked: false
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
