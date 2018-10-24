/**
/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

import { Action } from 'redux';
import { initialStatus, fetching, retrieving, failure } from './ApiReducer';
import actionTypes from '../../ActionTypes';

export const ApiReducerStudentSession = (
  state = initialStatus,
  act: Action
): ApiState => {
  switch (act.type) {
    case actionTypes.PUT_STUDENT_SESSION_APPL: {
      const stateChange: ApiState = fetching;
      return { ...state, ...stateChange };
    }

    case actionTypes.PUT_STUDENT_SESSION_APPL_SUCCESS: {
      const stateChange: ApiState = retrieving;
      return { ...state, ...stateChange };
    }

    case actionTypes.PUT_STUDENT_SESSION_APPL_FAILURE: {
      const stateChange: ApiState = failure();
      return { ...state, ...stateChange };
    }

    default: {
      return state;
    }
  }
};

export default ApiReducerStudentSession;
