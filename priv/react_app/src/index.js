import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { CreateJumpstateMiddleware } from 'jumpstate'

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import App from './App'
import CounterState from './state/counter'
import './index.css'

const states = {
  counter: CounterState
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
      <Router>
        <Switch>
          <Route exact path='/' component={App}/>
          <Route path='/test' render={() => <div>This is another route</div>}/>
        </Switch>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
