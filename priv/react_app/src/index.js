import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { setupErrorTracking } from './Util/ErrorTracking'

// Required by material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './App'
import './index.css'

import { BrowserRouter } from 'react-router-dom'

import getStore from './store'

if(process.env.NODE_ENV === 'production') {
  setupErrorTracking()
}

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
