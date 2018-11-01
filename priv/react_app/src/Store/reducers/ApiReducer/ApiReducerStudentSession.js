/**
/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

import { initialStatus, fetching, retrieving, failure } from './ApiReducer';
import * as actionTypes from '../../ActionTypes';
import type { ApiStatus } from './ApiReducer';

export const ApiReducerStudentSession = (
  state: ApiStatus = initialStatus,
  act: { type: string }
) => {
  switch (act.type) {
    case actionTypes.PUT_STUDENT_SESSION_APPL: {
      const stateChange = fetching;
      return { ...state, ...stateChange };
    }

    case actionTypes.PUT_STUDENT_SESSION_APPL_SUCCESS: {
      const stateChange = retrieving;
      return { ...state, ...stateChange };
    }

    case actionTypes.PUT_STUDENT_SESSION_APPL_FAILURE: {
      const stateChange = failure();
      return { ...state, ...stateChange };
    }

    default: {
      return state;
    }
  }
};

export default ApiReducerStudentSession;
