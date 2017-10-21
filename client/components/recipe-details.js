import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class RecipeDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src="https://search.chow.com/thumbnail/1280/800/www.chowstatic.com/assets/2014/11/31178_slow_cooker_pork_ramen_3000.jpg" />
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">Pork Ramen</span>
                <ul>
                  <li><strong>Difficulty:</strong> Very Easy</li>
                  <li><strong>Estimated Time:</strong> 25 Minutes</li>
                </ul>
                <div>

                  <div className="row">
                    <div className="col s6 m10">
                      <div className="card white">
                        <div className="card-content black-text">
                          <span className="card-title"> Ingredients: <i className="material-icons right">shopping_cart</i></span>
                          <table className="highlight">
                            <thead>
                              <tr>
                                <th>Item Name</th>
                                <th>Item Amount</th>
                              </tr>
                            </thead>

                            <tbody>
                              <tr>
                                <td>Pork</td>
                                <td>1 lb</td>
                              </tr>
                              <tr>
                                <td>Ramen Noodles</td>
                                <td>1 pack</td>
                              </tr>
                              <tr>
                                <td>Egg</td>
                                <td>1 ct</td>
                              </tr>
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
                              <tr>
                                <td>1 pot</td>
                              </tr>
                              <tr>
                                <td>1 bowl</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <p>Directions:</p>
                <br />
                <p>
                  1. Put a large sauté pan or the flameproof insert of a slow cooker on the stove top over medium-high heat, then add the oil and warm until hot. Working in batches if necessary to avoid crowding, add the pork pieces and sear them on the first side without moving them until well browned, 3 to 4 minutes. Turn the pieces and sear on the second side until well browned, 3 to 4 minutes longer. Transfer to a plate and set aside.
                </p>
                <p>
                  2. Pour off all but 2 Tbs. of the fat from the sauté pan or insert and return to medium-high heat. Add the yellow onion and sear, without stirring, until browned, about 5 minutes. Stir in the garlic, ginger and 1 cup (8 fl. oz./250 ml) of the broth and deglaze the sauté pan or insert, stirring and scraping up any browned bits from the bottom, then let simmer for 1 minute.
                </p>
                <p>
                  3. If using a sauté pan, transfer the contents of the pan to the insert of a slow cooker. Add the leek, mushrooms and the remaining 7 cups (56 fl. oz./1.75 l) broth and stir to combine. Cover and cook on the low setting for 8 hours. The pork should be very tender and the broth should be fragrant.
                </p>
                <p>
                  4. Transfer the pork to a cutting board. Using 2 forks, break the pork into bite-size chunks, removing and discarding any large pieces of fat. Strain the broth through a fine-mesh sieve into a bowl and discard the solids. Using a large spoon, skim off and discard any fat from the surface of the broth. Return the pork and broth to the slow cooker and season to taste with soy sauce and sesame or chile oil. Cover and cook on the low setting for about 30 minutes to warm through.
                </p>
                <p>
                  5. Cook the ramen noodles according to the package directions. Bring a large pot of water to a boil, add the eggs and reduce the heat to a simmer. Simmer the eggs for 5 to 6 minutes. Remove the eggs from the water, let cool until they can be handled and peel them. Cut each in half lengthwise.
                </p>
                <p>
                  6. To serve, divide the noodles evenly among individual bowls. Ladle the broth and pork over the noodles, dividing them evenly, then sprinkle with the green onions. Top each bowl with two soft-boiled egg halves and serve immediately. Serves 8.
                </p>
                <div className="fixed-action-btn horizontal click-to-toggle">
                  <a className="btn-floating btn-large red">
                    <i className="material-icons">menu</i>
                  </a>
                  <ul>
                    <li><a className="btn-floating blue"><i className="material-icons">email</i></a></li>
                    <li><a className="btn-floating green"><i className="material-icons">local_printshop</i></a></li>
                    <li><a className="btn-floating pink"><i className="material-icons">favorite</i></a></li>
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
