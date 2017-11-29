/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

import {actionTypes} from './../../../Store'
import {mergeDeepRight} from 'ramda'

export type CurrentState = {
  user: number
}

let initialState = {
  user: undefined
}

export const CurrentReducer = (state = initialState, action): CurrentState => {
  switch(action.type) {

    case actionTypes.FETCH_CURRENT_USER_SUCCESS:
      return mergeDeepRight(state, {user: action.user.id})

    default:
      return state;
  }
}
