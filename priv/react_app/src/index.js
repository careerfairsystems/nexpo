import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { CreateJumpstateMiddleware } from 'jumpstate'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// Required by material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './App'
import DataState from './state/data'
import './index.css'

import { BrowserRouter } from 'react-router-dom'

// Required by Material-ui
injectTapEventPlugin();

const states = {
  data: DataState
}

const store = createStore(
  combineReducers(states),
  applyMiddleware(
    CreateJumpstateMiddleware()
  )
)

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
