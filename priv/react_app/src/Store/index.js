/**
 *  This is the center of state. It should expose all methods needed by other parts of application
 */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers, { State } from './reducers';

import Actions from './actions';
import actionTypes from './ActionTypes';
import Selectors from './selectors';

/**
 * Manage creation of store
 */

let store;

const middlewares = [thunk];
// if (process.env.NODE_ENV === 'development') {
//   const { logger } = require('redux-logger');
//   middlewares.push(logger);
// }

const createStoreIfNotExist = () => {
  if (!store) {
    store = createStore(
      combineReducers(reducers),
      applyMiddleware(...middlewares)
    );
  }
};

const getStore = () => {
  createStoreIfNotExist();
  return store;
};

export { getStore, Actions, actionTypes, State, Selectors };
