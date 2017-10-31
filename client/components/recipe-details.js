import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setPoints } from '../actions/actions.js';
import { bindActionCreators } from 'redux';
class RecipeDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    console.log(params);

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
        console.log('Points --> ', this.props.points);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log('recipe complete!');
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
                                <th>Item Name</th>
                                <th>Item Quantity</th>
                              </tr>
                            </thead>

                            <tbody>
                              {
                                (this.state.ingredients.length)
                                  ? (this.state.ingredients.map(item => (
                                    <tr className="ingredient"
                                      key={item.name}>
                                      <td>{item.name}</td>
                                      <td>{item.quantity}</td>
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
                              {
                                (this.state.equipment.length)
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
                  {
                    (this.state.instructions.length)
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
                  </div>
                </div>
                <div className="fixed-action-btn horizontal click-to-toggle">
                  <a className="btn-floating btn-large red">
                    <i className="material-icons">menu</i>
                  </a>
                  <ul>
                    <li><a className="btn-floating blue"><i className="material-icons">email</i></a></li>
                    <li><a className="btn-floating green"><i className="material-icons">local_printshop</i></a></li>
                    <li>
                      {
                        (this.state.bookmarked)
                          ? <a onClick={this.handleRemoveBookmark} className="btn-floating cyan"><i className="material-icons">bookmark</i></a>
                          : <a onClick={this.handleAddBookmark} className="btn-floating cyan"><i className="material-icons">bookmark_border</i></a>
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
    points: state.points
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setPoints }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
