import React from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';

export default class MiniRecipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookmarked: false
    };

    this.handleAddBookmark = this.handleAddBookmark.bind(this);
    this.handleRemoveBookmark = this.handleRemoveBookmark.bind(this);
  }

  checkBookmarks() {
    const user = JSON.parse(localStorage.profile);
    const userId = user.user_id;

    const { recipe } = this.props;
    const params = {
      recipeId: recipe._id,
      userId: userId
    };

    axios.get('/api/bookmarks', { params: params })
      .then((res) => {
        console.log(res.data);
        this.setState({
          bookmarked: res.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleAddBookmark() {
    const user = JSON.parse(localStorage.profile);
    const userId = user.user_id;

    const { recipe } = this.props;
    const params = {
      recipeId: recipe._id,
      userId: userId
    };
    axios.put('/api/bookmarks', params)
      .then((res) => {
        console.log('bookmarked');
        this.setState({
          bookmarked: true
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleRemoveBookmark() {
    const user = JSON.parse(localStorage.profile);
    const userId = user.user_id;

    const { recipe } = this.props;
    const params = {
      recipeId: recipe._id,
      userId: userId
    };
    axios.delete('/api/bookmarks', { params: params })
      .then((res) => {
        console.log('removed');
        this.setState({
          bookmarked: false
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h5>{this.props.recipe.name}</h5>
        <ul>
          <li>Time: {this.props.recipe.time} min</li>
          <li>Difficulty: {this.props.recipe.difficulty}</li>
        </ul>
        <div>
          <img src={this.props.recipe.imageUrl} width="150" height="150" />
        </div>
        <div className="card-action">
          <Link to={`recipes/${this.props.recipe._id}`}>Details</Link>
          {
            (this.state.bookmarked)
              ? <a onClick={this.handleRemoveBookmark}>Remove Bookmark</a>
              : <a onClick={this.handleAddBookmark}>Bookmark</a>
          }
        </div>
      </div>
    );
  }
}
