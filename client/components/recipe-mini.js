import React from 'react';
import { Link, Route } from 'react-router-dom';

export default class MiniRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddBookmark = this.handleAddBookmark.bind(this);
  }

  handleAddBookmark(id) {
    const { recipe } = this.props;
    axios.post('/api/bookmarks', {id: recipe._id})
      .then((res) => {
        console.log('bookmark added');
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
          <div>
            <a onClick={this.handleAddBookmark}>Bookmark</a>
          </div>
        </div>
      </div>
    );
  }
}
