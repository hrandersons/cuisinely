import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './nav-bar.js';
import SideDrawer from './side-drawer.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {teal300, grey900} from 'material-ui/styles/colors';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.muiTheme = getMuiTheme({
      palette: {
        primaryColor: teal300,
        textColor: grey900,
      },
      appBar: {
        height: 50,
        textColor: grey900,
        color: teal300
      },
      toolbar: {
        backgroundColor: teal300,
      }
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={this.muiTheme}>
        <div>
          <NavBar />
          <SideDrawer />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
