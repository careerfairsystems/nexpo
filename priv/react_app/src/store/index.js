/**
 *  This file exposes a method for retrieving the redux store
 */

import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'

let store = undefined

const createStoreIfNotExist = () => {
  if(!store) {
    store = createStore(
      combineReducers(reducers),
      applyMiddleware(thunk)
    )
  }
}

const getStore = () => {
  createStoreIfNotExist()
  return store
}

export default getStore
