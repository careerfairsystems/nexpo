/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

import { actionTypes } from '../..';

type FETCH_CURRENT_USER_SUCCESS = {
  type: typeof actionTypes.FETCH_CURRENT_USER_SUCCESS,
  user: { id: number }
};

type DELETE_CURRENT_USER_SUCCESS = {
  type: typeof actionTypes.DELETE_CURRENT_USER_SUCCESS
};

type Action = FETCH_CURRENT_USER_SUCCESS | DELETE_CURRENT_USER_SUCCESS;

export type CurrentState = {
  user: ?number
};

const initialState = {
  user: undefined
};

export const CurrentReducer = (
  state: CurrentState = initialState,
  action: Action
): CurrentState => {
  switch (action.type) {
    case actionTypes.FETCH_CURRENT_USER_SUCCESS:
      return { ...state, user: action.user.id };
    case actionTypes.DELETE_CURRENT_USER_SUCCESS:
      return { ...state, user: null };

    default:
      return state;
  }
};

export default CurrentReducer;
