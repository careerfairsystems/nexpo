/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

import { Action } from 'redux';
import { initialStatus, fetching, retrieving, failure } from './ApiReducer';
import actionTypes from '../../ActionTypes';

export const ApiReducerRoles = (
  state = initialStatus,
  act: Action
): ApiState => {
  switch (act.type) {
    case actionTypes.FETCH_ROLES: {
      const stateChange: ApiState = fetching;
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_ROLES_SUCCESS: {
      const stateChange: ApiState = retrieving;
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_ROLES_FAILURE: {
      const stateChange: ApiState = failure();
      return { ...state, ...stateChange };
    }

    default: {
      return state;
    }
  }
};

export default ApiReducerRoles;
