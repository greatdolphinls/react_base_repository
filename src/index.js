import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';
import history from './setting/history';
import { LanguageStore } from './context/LanguageContext';
ReactDOM.render(
  <Provider store={store}>
    <LanguageStore>
      <Router history={history}>
        <App />
      </Router>
    </LanguageStore>
  </Provider>,
  document.getElementById('root'),
);