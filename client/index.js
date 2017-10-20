import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app.js';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render((<Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
  ), document.getElementById('app'));
