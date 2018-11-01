/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

import { initialStatus, fetching, retrieving, failure } from './ApiReducer';
import * as actionTypes from '../../ActionTypes';
import type { ApiStatus } from './ApiReducer';

export const ApiReducerDeadlines = (
  state: ApiStatus = initialStatus,
  act: { type: string }
) => {
  switch (act.type) {
    case actionTypes.FETCH_DEADLINE: {
      const stateChange = fetching;
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_DEADLINE_SUCCESS: {
      const stateChange = retrieving;
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_DEADLINE_FAILURE: {
      const stateChange = failure();
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_DEADLINES: {
      const stateChange = fetching;
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_DEADLINES_SUCCESS: {
      const stateChange = retrieving;
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_DEADLINES_FAILURE: {
      const stateChange = failure();
      return { ...state, ...stateChange };
    }

    default: {
      return state;
    }
  }
};

export default ApiReducerDeadlines;
