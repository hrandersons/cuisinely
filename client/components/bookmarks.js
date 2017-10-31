import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import RecipeEntry from './recipe-entry';

export default class Bookmarks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookmarks: []
    };

    this.getBookmarks = this.getBookmarks.bind(this);
  }

  componentDidMount() {
    this.getBookmarks();
  }

  getBookmarks() {
    axios.get('/api/bookmarks/get', { params: {userId: this.props.userId } })
      .then((res) => {
        this.setState({
          bookmarks: res.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="card white">
        <div className="card-content black-text">
          <span className="card-title">Bookmarks</span>
          <div>
            <ul>
              {(this.state.bookmarks.length)
                ? this.state.bookmarks.map((recipe) => <li key={recipe.algolia}><Link to={`recipes/${recipe.algolia}`}>{recipe.name}</Link></li>)
                : 'You don\'t have any bookmarked recipes!'}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
