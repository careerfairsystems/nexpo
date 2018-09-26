/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

import { Action } from 'redux';
import { initialStatus, fetching, retrieving } from './ApiReducer';
import actionTypes from '../../ActionTypes';

export const ApiReducerForgotPassword = (
  state = initialStatus,
  act: Action
): ApiState => {
  switch (act.type) {
    case actionTypes.FORGOT_PASSWORD_REQUEST: {
      const stateChange: ApiState = fetching;
      return { ...state, ...stateChange };
    }

    case actionTypes.FORGOT_PASSWORD_SUCCESS: {
      const stateChange: ApiState = retrieving;
      return { ...state, ...stateChange };
    }

    default: {
      return state;
    }
  }
};

export default ApiReducerForgotPassword;
