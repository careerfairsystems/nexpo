/**
 *  This is the center of state. It should expose all methods needed by other parts of application
 */

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import type { Store as ReduxStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Actions from './actions';
import * as actionTypes from './ActionTypes';
import Selectors from './selectors';
import type { State } from './reducers';
/**
 * Manage creation of store
 */
let store;

const middlewares = [thunk];
if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreIfNotExist = () => {
  if (!store) {
    store = createStore(
      combineReducers(reducers),
      composeEnhancers(applyMiddleware(...middlewares))
    );
  }
};

const getStore = (): ReduxStore<State, any> => {
  createStoreIfNotExist();
  return store;
};
export { getStore, Actions, actionTypes, Selectors };
