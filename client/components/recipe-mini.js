import React from 'react';
import { Button, Icon } from 'react-materialize';
import { Link, Route, Redirect } from 'react-router-dom';
import { setEdit, completeRecipe, setPoints } from '../actions/actions.js';
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
    this.handleComplete = this.handleComplete.bind(this);
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

  handleComplete() {
    const userId = this.props.user.user_id;
    let completed = {};
    let totalComplete = 0;
    completed.algolia = this.props.recipe.algolia;
    completed.date = this.props.recipe.date;
    this.props.completeRecipe(completed);

    axios.post('/api/points', {
      userId: userId
    })
      .then((res) => {
        this.props.setPoints(res.data.points);
      })
      .catch((err) => {
        console.log(err);
      });

    this.props.mealPlan.forEach((recipe) => {
      if (recipe.complete) {
        totalComplete ++;
      }
    });

    if (totalComplete === 5) {
      let newPoints = this.props.points + 5;
      axios.post('/api/bonus', {
        userId: userId,
        points: newPoints
      })
        .then((res) => {
          this.props.setPoints(newPoints);
        })
        .catch((err) => {
          console.log(err);
        });
      Materialize.toast('Congratulations, chef! You met your weekly goal!', 4000);
    }

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
                ? <Link to='/recipes' onClick={this.handleEdit}>Editing...</Link>
                : <Link to='/recipes' onClick={this.handleEdit}>Edit</Link>
            }
          </div>
          <div align="center">
            <a onClick={this.handleComplete} className={this.props.recipe.complete ? 'disabled waves-effect waves-light btn yellow darken-3' : 'waves-effect waves-light btn yellow darken-3'}><i className="material-icons left">star</i>Done!</a>
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
    editDate: state.editDate,
    mealPlan: state.mealPlan,
    points: state.points
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setEdit, completeRecipe, setPoints }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MiniRecipe);
