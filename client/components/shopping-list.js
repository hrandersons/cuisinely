import React from 'react';

export default class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
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
