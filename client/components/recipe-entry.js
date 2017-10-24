import React from 'react';
import { Link } from 'react-router-dom';

class RecipeEntry extends React.Component {
  constructor(props) {
    super(props);
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
              <Link to={`details/${recipe._id}`}>Explore</Link>
              <a href="#">Bookmark</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeEntry;
