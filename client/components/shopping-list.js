import React from 'react';
import { connect } from 'react-redux';
import Locator from './locator.js';

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
  }

  printRecipe() {
    window.print();
  }

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="card white">
            <div className="card-content black-text">
              <span className="card-title"> Groceries: <i className="material-icons right">shopping_cart</i></span>

              <table className="highlight">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Item Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    (this.props.ingredients.length)
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
