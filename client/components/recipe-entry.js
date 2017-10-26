import React from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';

class RecipeEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookmarked: false
    };
    this.handleAddBookmark = this.handleAddBookmark.bind(this);
    this.handleRemoveBookmark = this.handleRemoveBookmark.bind(this);
  }

  componentDidMount() {
    this.checkBookmarks();
  }

  checkBookmarks() {
    const user = JSON.parse(localStorage.profile);
    const userId = user.user_id;

    const { recipe } = this.props;
    const params = {
      recipeId: recipe._id,
      userId: userId
    };

    axios.get('/api/bookmarks/check', { params: params })
      .then((res) => {
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
    const { recipe } = this.props;
    return (
      <div className="col s12 m7">
        <div className="card horizontal hoverable">
          <div className="card-image thumbnail">
            <img src={(recipe.imageUrl === 'none') ? '/assets/no_img.jpg' : (recipe.imageUrl)} />
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <span className="card-title"><strong>{recipe.name}</strong> ({recipe.rating})</span>
              <blockquote>
                {recipe.description}
              </blockquote>
              <ul>
                <li><strong>Difficulty:</strong> {recipe.difficulty}</li>
                <li><strong>Estimated Time:</strong> {recipe.time} Minutes</li>
              </ul>
            </div>
            <div className="card-action">
              <Link to={`recipes/${recipe._id}`}>Explore</Link>
              {
                (this.state.bookmarked)
                  ? <a onClick={this.handleRemoveBookmark}>Remove Bookmark</a>
                  : <a onClick={this.handleAddBookmark}>Bookmark</a>
              }

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeEntry;
