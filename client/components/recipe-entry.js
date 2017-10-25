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
  }

  componentDidMount() {

  }

  checkBookmarks() {
    //TODO: check if recipe is bookmarked
  }

  handleAddBookmark() {
    const user = JSON.parse(localStorage.profile);
    const userId = user.user_id;

    const { recipe } = this.props;
    const params = {
      recipeId: recipe._id,
      userId: userId
    };

    console.log(params);
    axios.put('/api/bookmarks', params)
      .then((res) => {
        console.log('bookmark added', res);
        this.setState({
          bookmarked: true
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
              <a onClick={this.handleAddBookmark}>Bookmark</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeEntry;
