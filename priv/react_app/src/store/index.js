/**
 *  This file exposes a method for retrieving the redux store
 */

import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'

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

export default getStore
