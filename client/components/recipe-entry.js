import React from 'react';
import { Link, Route } from 'react-router-dom';
import { setUserInfo, editMealPlan } from '../actions/actions.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch/dom';

class RecipeEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookmarked: false
    };
    this.handleAddBookmark = this.handleAddBookmark.bind(this);
    this.handleRemoveBookmark = this.handleRemoveBookmark.bind(this);
    this.checkBookmarks = this.checkBookmarks.bind(this);
    this.handleEditPlan = this.handleEditPlan.bind(this);
  }

  componentDidMount() {
    this.checkBookmarks();
  }

  checkBookmarks() {
    const userId = this.props.user.user_id;
    const { hit } = this.props;
    const params = {
      recipeId: hit.objectID,
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
    const { hit } = this.props;
    const params = {
      recipeId: hit.objectID,
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
    const { hit } = this.props;
    const params = {
      recipeId: hit.objectID,
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

  handleEditPlan() {
    let replacementRecipe = this.props.hit;
    replacementRecipe.algolia = replacementRecipe.objectID;
    this.props.editMealPlan(replacementRecipe);
  }

  render() {
    const { hit } = this.props;
    return (
      <div>
        <div className="col s12">
          <div className="card horizontal hoverable">
            <div className="card-image thumbnail">
              <img src={(hit.imageUrl === 'none') ? '/assets/no_img.jpg' : (hit.imageUrl)} />
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <span className="card-title"><strong>{hit.name}</strong> ({hit.rating}) </span>
                <blockquote>
                  {hit.description}
                </blockquote>
                <ul>
                  <li><strong>Difficulty:</strong> {hit.difficulty} </li>
                  <li><strong>Estimated Time:</strong> {hit.time} Minutes</li>
                </ul>
              </div>
              <div className="card-action">
                <Link to={`recipes/${hit.objectID}`}>Explore</Link>
                {
                  (this.state.bookmarked)
                    ? <a onClick={this.handleRemoveBookmark}>Remove Bookmark</a>
                    : <a onClick={this.handleAddBookmark}>Bookmark</a>
                }
                {
                  (this.props.editId)
                    ? <Link to='/meals' onClick={this.handleEditPlan}>Add to plan</Link>
                    : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    editId: state.editId
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ editMealPlan }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEntry);
