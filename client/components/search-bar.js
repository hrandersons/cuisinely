import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchSubmit() {
    // search for recipe!
  }

  render() {
    return (
      <div className="row">
        <div className="input-field col s8">
          <input type="text" id="icon_prefix" className="validate"/>
          <label htmlFor="icon_prefix">Search Recipes</label>
          <a onClick={this.handleSearchSubmit}><i className="material-icons prefix">search</i></a>
        </div>
      </div>
    );
  }
}

export default SearchBar;
