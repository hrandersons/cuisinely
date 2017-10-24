import React from 'react';
import axios from 'axios';

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
      instructions: []
    };
  }

  componentDidMount() {
    this.getRecipeDetail();
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
          instructions: recipe.instructions
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleRecipeComplete() {
    // TODO: Award points
    console.log('recipe complete!');
  }

  //handle Adding to bookmarks
  // handleAddToBookmarks() {
  //
  // }

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
                    <li><a className="btn-floating cyan"><i className="material-icons">add</i></a></li>
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

export default RecipeDetails;
