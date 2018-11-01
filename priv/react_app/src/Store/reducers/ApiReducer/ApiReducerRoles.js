/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

import { initialStatus, fetching, retrieving, failure } from './ApiReducer';
import * as actionTypes from '../../ActionTypes';
import type { ApiStatus } from './ApiReducer';

export const ApiReducerRoles = (
  state: ApiStatus = initialStatus,
  act: { type: string }
) => {
  switch (act.type) {
    case actionTypes.FETCH_ROLE: {
      const stateChange = fetching;
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_ROLE_SUCCESS: {
      const stateChange = retrieving;
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_ROLE_FAILURE: {
      const stateChange = failure();
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_ROLES: {
      const stateChange = fetching;
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_ROLES_SUCCESS: {
      const stateChange = retrieving;
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_ROLES_FAILURE: {
      const stateChange = failure();
      return { ...state, ...stateChange };
    }

    default: {
      return state;
    }
  }
};

export default ApiReducerRoles;
