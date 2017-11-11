/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

import actionTypes from '../../ActionTypes';
import {mergeDeepRight} from 'ramda'

let initialState = {
  user: undefined
}

const current = (state = initialState, action) => {
  switch(action.type) {

    case actionTypes.FETCH_CURRENT_USER_SUCCESS:
      return mergeDeepRight(state, {user: action.user.id})

    default:
      return state;
  }
}

export default current;
