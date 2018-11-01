/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

import { initialStatus, fetching, retrieving, failure } from './ApiReducer';
import * as actionTypes from '../../ActionTypes';
import type { ApiStatus } from './ApiReducer';

export const ApiReducerVerifyForgotPassword = (
  state: ApiStatus = initialStatus,
  act: { type: string }
) => {
  switch (act.type) {
    case actionTypes.VERIFY_FORGOT_PASSWORD_KEY_REQUEST: {
      const stateChange = fetching;
      return { ...state, ...stateChange };
    }

    case actionTypes.VERIFY_FORGOT_PASSWORD_KEY_SUCCESS: {
      const stateChange = retrieving;
      return { ...state, ...stateChange };
    }

    case actionTypes.VERIFY_FORGOT_PASSWORD_KEY_FAILURE: {
      const stateChange = failure();
      return { ...state, ...stateChange };
    }

    default: {
      return state;
    }
  }
};

export default ApiReducerVerifyForgotPassword;
