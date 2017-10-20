import React from 'react';
import Login from './login';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import App from './app';
class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      open: !this.state.open
    });
  }
  render() {
    if (this.state.open) {
      return (
        <div> 
          <App />
        </div>
      );
    } else {
      return (
        <div>
          <Route path='/login' render={props => (<Login {...props} />)} />
        </div>
      );
    }
  }
}

export default MainPage;
