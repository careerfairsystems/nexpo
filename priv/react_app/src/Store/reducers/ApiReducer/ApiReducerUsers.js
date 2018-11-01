/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

import { initialStatus, fetching, retrieving, failure } from './ApiReducer';
import * as actionTypes from '../../ActionTypes';
import type { ApiStatus } from './ApiReducer';

export const ApiReducerUsers = (
  state: ApiStatus = initialStatus,
  act: { type: string }
) => {
  switch (act.type) {
    case actionTypes.FETCH_USER: {
      const stateChange = fetching;
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_USER_SUCCESS: {
      const stateChange = retrieving;
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_USER_FAILURE: {
      const stateChange = failure();
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_USERS: {
      const stateChange = fetching;
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_USERS_SUCCESS: {
      const stateChange = retrieving;
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_USERS_FAILURE: {
      const stateChange = failure();
      return { ...state, ...stateChange };
    }

    default: {
      return state;
    }
  }
};

export default ApiReducerUsers;
