import React from 'react';
import { Link, Route } from 'react-router-dom';

export default class MiniRecipe extends React.Component {
  constructor(props) {
    super(props);
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
