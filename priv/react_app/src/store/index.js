/**
 * This file exposes a method for retrieving the redux store
 */

import { createStore, combineReducers } from 'redux'
import reducers from './reducers'

let store = undefined

const createStoreIfNotExist = () => {
  if(!store) {
    store = createStore(
      combineReducers(reducers)
    )
  }
}

const getStore = () => {
  createStoreIfNotExist()
  return store
}

export default getStore
