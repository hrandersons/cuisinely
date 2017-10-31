import React from 'react';
import { Button, Icon } from 'react-materialize';
import { Link, Route } from 'react-router-dom';
import { setEdit } from '../actions/actions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

class MiniRecipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookmarked: false
    };

    this.checkBookmarks = this.checkBookmarks.bind(this);
    this.handleAddBookmark = this.handleAddBookmark.bind(this);
    this.handleRemoveBookmark = this.handleRemoveBookmark.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    this.checkBookmarks();
  }

  checkBookmarks() {
    const userId = this.props.user.user_id;
    const { recipe } = this.props;
    const params = {
      recipeId: recipe.algolia,
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
    const userId = this.props.user.user_id;
    const { recipe } = this.props;
    const params = {
      recipeId: recipe.algolia,
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
    const userId = this.props.user.user_id;
    const { recipe } = this.props;
    const params = {
      recipeId: recipe.algolia,
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

  handleEdit() {
    let editedRecipe = {};
    editedRecipe.id = this.props.recipe.algolia;
    editedRecipe.date = this.props.recipe.date;
    this.props.setEdit(editedRecipe);
  }

  render() {
    return (
      <div>
        <span className="recipe-mini-title">{this.props.recipe.name}</span>
        <ul>
          <li>Time: {this.props.recipe.time} min</li>
          <li>Difficulty: {this.props.recipe.difficulty}</li>
        </ul>
        <div>
          <img className="recipe-mini-img" src={(this.props.recipe.imageUrl === 'none') ? '/assets/no_img.jpg' : (this.props.recipe.imageUrl)} />
        </div>
        {/* button that marks a recipe as complete or not:
            on click :
            sets 'completed' key in recipe to 'true'
              and awards points to user
              as long as 'completed' is false

            find recipe in current meal plan in redux state
              make slice of current meal plan
              set recipe 'completed' to true

             */}
        <div className="card-action">
          <Link to={`recipes/${this.props.recipe.algolia}`}>Details</Link>
          {
            (this.state.bookmarked)
              ? <a onClick={this.handleRemoveBookmark}>Remove Bookmark</a>
              : <a onClick={this.handleAddBookmark}>Bookmark</a>
          }
          <div>
            {
              (this.props.editId === this.props.recipe.algolia && this.props.editDate === this.props.recipe.date)
                ? <a onClick={this.handleEdit}>Editing...</a>
                : <a onClick={this.handleEdit}>Edit</a>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    editId: state.editId,
    editDate: state.editDate
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setEdit }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MiniRecipe);
