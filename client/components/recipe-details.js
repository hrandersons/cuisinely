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
      <Card>
        <CardMedia
        >
          <img src="https://search.chow.com/thumbnail/1280/800/www.chowstatic.com/assets/2014/11/31178_slow_cooker_pork_ramen_3000.jpg" alt="" />
        </CardMedia>
        <CardTitle title="Ramen" subtitle="Difficulty: Very Easy, Estimated Time: 25 min" />
        <CardText>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Ingredients</TableHeaderColumn>
                <TableHeaderColumn>Amount</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableRowColumn>Ramen Noodles</TableRowColumn>
                <TableRowColumn>1 pack</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Egg</TableRowColumn>
                <TableRowColumn>1</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Chicken Broth</TableRowColumn>
                <TableRowColumn>4 cups</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Pork</TableRowColumn>
                <TableRowColumn>1/2 pound</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Scallions</TableRowColumn>
                <TableRowColumn>1 stock</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </CardText>
        <CardActions>
          <FlatButton label="Print" />
          <FlatButton label="Email" />
        </CardActions>
      </Card>
    );

  }
}

export default RecipeDetails;
