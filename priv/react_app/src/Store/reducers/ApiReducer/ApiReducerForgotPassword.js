/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

import { Action } from 'redux';
import { initialStatus, fetching, retrieving } from './ApiReducer';
import actionTypes from '../../ActionTypes';
import type { ApiStatus } from './ApiReducer';

export const ApiReducerForgotPassword = (
  state: ApiStatus = initialStatus,
  act: Action
) => {
  switch (act.type) {
    case actionTypes.FORGOT_PASSWORD_REQUEST: {
      const stateChange = fetching;
      return { ...state, ...stateChange };
    }

    case actionTypes.FORGOT_PASSWORD_SUCCESS: {
      const stateChange = retrieving;
      return { ...state, ...stateChange };
    }

    default: {
      return state;
    }
  }
};

export default ApiReducerForgotPassword;
