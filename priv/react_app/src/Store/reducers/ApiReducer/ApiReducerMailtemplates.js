/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

import { Action } from 'redux';
import { initialStatus, fetching, retrieving, failure } from './ApiReducer';
import actionTypes from '../../ActionTypes';

export const ApiReducerMailtemplates = (
  state = initialStatus,
  act: Action
): ApiState => {
  switch (act.type) {
    case actionTypes.FETCH_MAILTEMPLATE: {
      const stateChange: ApiState = fetching;
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_MAILTEMPLATE_SUCCESS: {
      const stateChange: ApiState = retrieving;
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_MAILTEMPLATE_FAILURE: {
      const stateChange: ApiState = failure();
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_MAILTEMPLATES: {
      const stateChange: ApiState = fetching;
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_MAILTEMPLATES_SUCCESS: {
      const stateChange: ApiState = retrieving;
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_MAILTEMPLATES_FAILURE: {
      const stateChange: ApiState = failure();
      return { ...state, ...stateChange };
    }

    default: {
      return state;
    }
  }
};

export default ApiReducerMailtemplates;
