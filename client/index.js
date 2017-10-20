import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app.js';
import { Provider } from 'react-redux';
import store from './store';
import { AppContainer } from 'react-hot-loader';
n;
const render = Component => {
  ReactDOM.render((
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>
  ), document.getElementById('app'));
};

render(App);

// Webpack Hot Module Replacement API

if (module.hot) {
  module.hot.accept();
}
