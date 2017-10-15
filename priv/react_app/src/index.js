import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// Required by material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './App'
import './index.css'

import { BrowserRouter } from 'react-router-dom'

import getStore from './store'
const store = getStore();

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
