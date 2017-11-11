import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPoints, editMealPlan, setLevel } from '../../actions/actions.js';
import { bindActionCreators } from 'redux';
import request from 'superagent';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share';
const { FacebookShareButton } = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');

class RecipeDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRecipe: {},
      name: '',
      imageUrl: '',
      time: 0,
      difficulty: 0,
      rating: 0,
      ingredients: [],
      equipment: [],
      instructions: [],
      id: '',
      bookmarked: false
    };

    this.handleAddBookmark = this.handleAddBookmark.bind(this);
    this.handleRemoveBookmark = this.handleRemoveBookmark.bind(this);
    this.checkBookmarks = this.checkBookmarks.bind(this);
    this.handleRecipeComplete = this.handleRecipeComplete.bind(this);
    this.handleEditPlan = this.handleEditPlan.bind(this);
    this.emailRecipe = this.emailRecipe.bind(this);
  }

  componentDidMount() {
    this.getRecipeDetail();
  }

  checkBookmarks(id) {
    const userId = this.props.user.user_id;
    const params = {
      recipeId: id,
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

  getRecipeDetail() {
    axios.get('/api/recipes/detail/' + this.props.match.params.recipeId)
      .then((res) => {
        const recipe = res.data[0];
        this.setState({
          currentRecipe: recipe,
          name: recipe.name,
          imageUrl: recipe.imageUrl,
          time: recipe.time,
          difficulty: recipe.difficulty,
          rating: recipe.rating,
          ingredients: recipe.ingredients,
          equipment: recipe.equipment,
          instructions: recipe.instructions,
          id: recipe.algolia,
        });
        this.checkBookmarks(recipe.algolia);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleAddBookmark() {
    const userId = this.props.user.user_id;
    const params = {
      recipeId: this.state.id,
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

  handleRating({ rating, type }) {
    this.setState({
      rating: rating
    });
    if (type === 'click') {
      const params = {
        rating: rating,
        recipeId: this.state.id,
      };
      axios.put('/api/recipes/detail/' + this.state.id, params)
        .then((res) => {
          console.log('rating submitted!');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleRemoveBookmark() {
    const userId = this.props.user.user_id;
    const params = {
      recipeId: this.state.id,
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

  handleRecipeComplete() {
    const userId = this.props.user.user_id;
    axios.post('/api/points', {
      userId: userId,
      points: 10
    })
      .then((res) => {
        this.props.setPoints(res.data.points);
        this.props.setLevel(res.data.level);
      })
      .catch((err) => {
        console.log(err);
      });
    Materialize.toast('Keep Cooking! You earned a point!', 4000);
    console.log('recipe complete!');
  }

  handleEditPlan() {
    this.props.editMealPlan(this.state.currentRecipe);
  }

  emailRecipe() {
    console.log('recipe sent');
    var url = 'http://localhost:8080/api/emailRecipe';
    request
      .post(url)
      .send({
        email: this.props.user.email,
        recipe: this.state,
        user: this.props.user,
      })
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
      });
    Materialize.toast('Recipe sent!', 4000);
  }

  printRecipe() {
    window.print();
  }

  render() {
    let stepCount = 1;
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src={this.state.imageUrl} />
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">{this.state.name}</span>
                <ul>
                  <li><strong>Difficulty:</strong> {this.state.difficulty}</li>
                  <li><strong>Estimated Time:</strong> {this.state.time} Minutes</li>
                </ul>
                <div>

                  <div className="row">
                    <div className="col s12">
                      <div className="card white">
                        <div className="card-content black-text">
                          <span className="card-title"> Ingredients: <i className="material-icons right">shopping_cart</i></span>
                          <table className="highlight">
                            <thead>
                              <tr>
                                <th>Item Quantity</th>
                                <th>Item Name</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                (this.state.ingredients.length)
                                  ? (this.state.ingredients.map(item => (
                                    <tr className="ingredient"
                                      key={item.algolia}>
                                      <td>{item.quantity}</td>
                                      <td>{item.name}</td>
                                    </tr>
                                  )))
                                  : (null)
                              }
                            </tbody>
                          </table>
                        </div>
                        <div className="card-action">
                          <table>
                            <thead>
                              <tr>
                                <th>Equipment</th>
                              </tr>
                            </thead>
                            <tbody>
                              {(this.state.equipment.length)
                                ? (this.state.equipment.map(equip => (
                                  <tr className="equipment"
                                    key={equip.name}>
                                    <td>{equip.quantity} {equip.name}</td>
                                  </tr>
                                )))
                                : (<tr><td>N/A</td></tr>)
                              }
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h5>Instructions:</h5>
                <div>
                  {(this.state.instructions.length)
                    ? (this.state.instructions.map(step => (
                      <ul className="instruction-step"
                        key={step}>
                        <li>{stepCount++}. {step}</li>
                      </ul>
                    )))
                    : (<span>N/A</span>)
                  }
                  <div align="center">
                    <a onClick={this.handleRecipeComplete} className="waves-effect waves-light btn yellow darken-3"><i className="material-icons left">star</i>Recipe Complete!</a>
                    <div>
                      <br />
                      <Rater onRate={this.handleRating.bind(this)} />
                      <br />
                    </div>
                    <div>
                      <br />
                      <a href="https://www.facebook.com/sharer/sharer.php?u=http://thepioneerwoman.com/cooking/" target={this.state.name}>
                        <FacebookIcon size={58} round={true} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="fixed-action-btn horizontal click-to-toggle">
                  <a className="btn-floating btn-large red">
                    <i className="material-icons">menu</i>
                  </a>
                  <ul>
                    <li><a onClick={this.emailRecipe} className="btn-floating blue"><i className="material-icons">email</i></a></li>
                    <li><a onClick={this.printRecipe} className="btn-floating green"><i className="material-icons">local_printshop</i></a></li>
                    <li>
                      {
                        (this.state.bookmarked)
                          ? <a onClick={this.handleRemoveBookmark} className="btn-floating cyan"><i className="material-icons">bookmark</i></a>
                          : <a onClick={this.handleAddBookmark} className="btn-floating cyan"><i className="material-icons">bookmark_border</i></a>
                      }
                    </li>
                    <li>
                      {(this.props.editId)
                        ? <Link to='/meals'> <a onClick={this.handleEditPlan} className="btn-floating yellow"><i className="material-icons">add_circle</i></a></Link>
                        : null
                      }
                    </li>
                  </ul>
                </div>
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
    points: state.points,
    mealPlan: state.mealPlan,
    editId: state.editId
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setPoints, editMealPlan, setLevel }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
