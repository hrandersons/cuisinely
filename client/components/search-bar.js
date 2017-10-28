import React from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
} from 'react-instantsearch/dom';
import algoliasearch from 'algoliasearch';

var client = algoliasearch('KUPHP9V5MI', '8e465f8475198ae5cb2d621323e06fb4');
var index = client.initIndex('recipes');

//
// **************
// search bar is being mapped multiple times in recipes
//
// separate search results (hits) to recipe entries
//
// **************

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
    // const userId = this.props.user.user_id;
    // const { recipe } = this.props.recipe;
    // console.log(this.props.recipe['name']);
    // const params = {
    //   recipeId: recipe._id,
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
    const user = JSON.parse(localStorage.profile);
    const userId = user.user_id;

    // const { recipe } = this.props;
    // const params = {
    //   recipeId: recipe._id,
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
    const user = JSON.parse(localStorage.profile);
    const userId = user.user_id;

    // const { recipe } = this.props;
    // const params = {
    //   recipeId: recipe._id,
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
      <InstantSearch
        appId="KUPHP9V5MI"
        apiKey="8e465f8475198ae5cb2d621323e06fb4"
        indexName="recipes">
        <header>
          <SearchBox translation={{placeholder: 'Search for Recipes!'}} />
        </header>
        <main>
          <Sidebar />
          <Content />
        </main>
      </InstantSearch>

    );
  }
}

const Hit = ({hit}) =>
  <div className="col s12 m7">
    <div className="card horizontal hoverable">
      <div className="card-image thumbnail">
        <img src={(hit.imageUrl === 'none') ? '/assets/no_img.jpg' : (hit.imageUrl)} />
      </div>
      <div className="card-stacked">
        <div className="card-content">
          <span className="card-title"><strong>{hit.name}</strong> ({hit.rating})</span>
          <blockquote>
            {hit.description}
          </blockquote>
          <ul>
            <li><strong>Difficulty:</strong> {hit.difficulty}</li>
            <li><strong>Estimated Time:</strong> {hit.time} Minutes</li>
          </ul>
        </div>
        <div className="card-action">
          <Link to={`recipes/${hit._id}`}>Explore</Link>
        </div>
      </div>
    </div>
  </div>;

const Sidebar = () =>
  <div className="sidebar">

  </div>;

const Content = () =>
  <div className="content">
    <Hits hitComponent={Hit} />
  </div>;

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(SearchBar);



// <div className="row">
//   <div className="input-field col s8">
//     <input type="text" id="icon_prefix" className="validate"/>
//     <label htmlFor="icon_prefix">Search Recipes</label>
//     <a onClick={this.handleSearchSubmit}><i className="material-icons prefix">search</i></a>
//   </div>
// </div>
