/**
 *  This is the center of state. It should expose all methods needed by other parts of application
 */

import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'

import Actions from './actions'
import actionTypes from './ActionTypes'

/**
 * Manage creation of store
 */

let store = undefined

const middlewares = [thunk]
if(process.env.NODE_ENV === 'development') {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger)
}

const createStoreIfNotExist = () => {
  if(!store) {
    store = createStore(
      combineReducers(reducers),
      applyMiddleware(...middlewares)
    )
  }
}

const getStore = () => {
  createStoreIfNotExist()
  return store
}

export {
  getStore,
  Actions,
  actionTypes
}
