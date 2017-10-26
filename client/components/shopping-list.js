import React from 'react';
import { connect } from 'react-redux';
import { setList } from '../actions/actions.js';

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
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
