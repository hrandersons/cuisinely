import React from 'react';
import places from 'places.js';

class Locator extends React.Component {
  constructor() {
    super();
  }

  //componentWillMount() {
  // this.places = places(this.refs.addressInput);
  // const script = document.createElement('script');
  // script.src = 'https://cdn.jsdelivr.net/leaflet/1/leaflet.js';
  // script.async = true;
  // document.body.appendChild(script);
  // const {addressInput} = this.refs;
  //}

  render() {
    return (
      // <input
      //   type="input"
      //   id="address-input"
      //   placeholder="Where are we going?"
      //   value={content}
      //   onChange={this.onChange}
      //   className={styles.editable}
      //   ref="addressInput" />
      <div>
        <div id="map-example-container" />
        <input type="search" id="input-map" className="form-control" placeholder="Where are we going?" />
        <style dangerouslySetInnerHTML={{__html: '\n  #map-example-container {height: 300px};\n' }} />
      </div>
    );
  }
}

export default Locator;

// import React from 'react'
// import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
//
// class Locator extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = { address: 'Enter a supermarket!' }
//     this.onChange = (address) => this.setState({ address })
//   }
//
//   handleFormSubmit = (event) => {
//     event.preventDefault()
//
//     geocodeByAddress(this.state.address)
//       .then(results => getLatLng(results[0]))
//       .then(latLng => console.log('Success', latLng))
//       .catch(error => console.error('Error', error))
//   }
//
//   render() {
//     const inputProps = {
//       value: this.state.address,
//       onChange: this.onChange,
//     }
//
//     return (
//       <form onSubmit={this.handleFormSubmit}>
//         <PlacesAutocomplete inputProps={inputProps} />
//         <button type="submit">Submit</button>
//       </form>
//     )
//   }
// }
//
// export default Locator;
