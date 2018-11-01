/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

import { initialStatus, fetching, retrieving, failure } from './ApiReducer';
import * as actionTypes from '../../ActionTypes';
import type { ApiStatus } from './ApiReducer';

export const ApiReducerProgrammes = (
  state: ApiStatus = initialStatus,
  act: { type: string }
) => {
  switch (act.type) {
    case actionTypes.FETCH_PROGRAMME: {
      const stateChange = fetching;
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_PROGRAMME_SUCCESS: {
      const stateChange = retrieving;
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_PROGRAMME_FAILURE: {
      const stateChange = failure();
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_PROGRAMMES: {
      const stateChange = fetching;
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_PROGRAMMES_SUCCESS: {
      const stateChange = retrieving;
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_PROGRAMMES_FAILURE: {
      const stateChange = failure();
      return { ...state, ...stateChange };
    }

    default: {
      return state;
    }
  }
};

export default ApiReducerProgrammes;
