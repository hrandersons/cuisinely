import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/main/app.js';
import { Provider } from 'react-redux';
import store from './store';
import { AppContainer } from 'react-hot-loader';

const render = Component => {
  ReactDOM.render((
    <Provider store={store}>
      <AppContainer>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </AppContainer>
    </Provider>
  ), document.getElementById('app'));
};

render(App);

// Webpack Hot Module Replacement API

if (module.hot) {
  module.hot.accept();
}

//http://localhost:8080/login#access_token=vX8UQgk7XnIyNHeHeqCTE9fKIy61Ecj8&expires_in=7200&token_type=Bearer&state=ECHlZvGc_Z6.ZP2IzIMjcSY.qS35YhYh
