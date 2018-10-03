/*
*   This is the main entrypoint for the application
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { setupErrorTracking } from './Util/ErrorTracking';

import App from './App';
import './index.css';

import { BrowserRouter, Route } from 'react-router-dom';

import { getStore, Actions } from './Store';

if (process.env.NODE_ENV === 'production') {
  setupErrorTracking();
}

const store = getStore();

store.dispatch(Actions.users.getCurrentUser());

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <BrowserRouter>
        <Route component={App} />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
