import React from 'react';
import { connect } from 'react-redux';
import GoogleMapLoader from 'react-google-maps-loader';
import Map from './map.js';

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
  }

  printRecipe() {
    window.print();
  }

  render() {
    return (
      <div>
        <br />
        <div className="row">
          <div className="col s2"></div>
          <div className="col s8">
            <div className="card white">
              <div className="card-content black-text">
                <span className="card-title"> <strong>Grocery List</strong> <i className="material-icons right">shopping_cart</i></span>
                <table className="highlight">
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Item Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(this.props.ingredients.length)
                      ? (this.props.ingredients.map(item => (
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
                <a onClick={this.printRecipe} className="btn-floating black"><i className="material-icons">local_printshop</i></a>
              </div>
            </div>
          </div>
          <div className="col s2"></div>
        </div>
        <div className="row">
          <div className="col s2"></div>
          <div className="col s8">
            <div className="card white">
              <div className="card-content black-text">
                <span className="card-title"> Find a supermarket here! <i className="material-icons left">location_on</i></span>
                <Map />
              </div>
            </div>
          </div>
          <div className="col s2"></div>
        </div>

        <div class="row">
          <div class="col s12">
            <div class="card white">
              <div class="card-content black-text">
                <Locator />
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
    ingredients: state.shoppingList
  };
};

export default connect(mapStateToProps)(ShoppingList);
