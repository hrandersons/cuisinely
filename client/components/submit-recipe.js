import React from 'react';
import { Input, Row } from 'react-materialize';

class SubmitRecipe extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmitRecipe = this.handleSubmitRecipe.bind(this);
  }

  handleSubmitRecipe() {
    console.log('yum!');
  }

  render() {
    return (
      <div className="container">
        <h4 className="component-title">Submit a Recipe!</h4>
        <Row>
          <form s={12} onSubmit={this.handleSubmitRecipe}>
            <Input s={6} label="Name" type="text" />
            <Input s={3} label="Time" type="text" />
            <Input s={3} label="Difficulty" type="text" />
            <Input s={6} label="Ingredients" type="text" />
            <Input s={6} label="Equipment" type="text" />
            <Input s={12} label="Directions" type="textarea" />
            <div className="file-field input-field col s6">
              <div className="btn">
                <span>File</span>
                <input type="file" />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" placeholder="Add a photo"/>
              </div>
            </div>
          </form>
        </Row>
      </div>
    );
  }
}

export default SubmitRecipe;
