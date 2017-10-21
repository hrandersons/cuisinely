import React from 'react';

class RecipeEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col s12 m7">
        <div className="card horizontal hoverable">
          <div className="card-image">
            <img src="http://lorempixel.com/200/200/food/" />
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <span className="card-title">Name of Recipe</span>
              <blockquote>
                A short description of this delicious yet easy to prepare food...
              </blockquote>
              <ul>
                <li><strong>Difficulty:</strong> Very Easy</li>
                <li><strong>Estimated Time:</strong> 25 Minutes</li>
              </ul>
            </div>
            <div className="card-action">
              <a href="/id">Explore</a>
              <a href="#">Bookmark</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeEntry;
