/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

import {actionTypes} from './../../../Store'
import {mergeDeepRight} from 'ramda'

export type FetchingState = {
  companies: boolean
}

let initialState = {
  companies: false
}

const entities = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_COMPANIES:
      return mergeDeepRight(state, {companies: true})

    case actionTypes.FETCH_COMPANIES_SUCCESS:
    case actionTypes.FETCH_COMPANIES_FAILURE:
      return mergeDeepRight(state, {companies: false})

    default:
      return state;
  }
}

export default entities;
