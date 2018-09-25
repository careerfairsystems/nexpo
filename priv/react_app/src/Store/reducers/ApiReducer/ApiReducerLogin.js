/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

import { Action } from 'redux';
import { initialStatus, retrieving, failure } from './ApiReducer';
import actionTypes from '../../ActionTypes';

export const ApiReducerUsers = (
  state = initialStatus,
  act: Action
): ApiState => {
  switch (act.type) {
    case actionTypes.LOGIN_SUCCESS: {
      const stateChange: ApiState = retrieving;
      return { ...state, ...stateChange };
    }

    case actionTypes.LOGIN_FAILURE: {
      const stateChange: ApiState = failure();
      return { ...state, ...stateChange };
    }

    default: {
      return state;
    }
  }
};

export default ApiReducerUsers;
