/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

import { initialStatus, fetching, retrieving, failure } from './ApiReducer';
import * as actionTypes from '../../ActionTypes';
import type { ApiStatus } from './ApiReducer';

type ReplaceForgottenPasswordRequest = {
  type: typeof actionTypes.REPLACE_FORGOTTEN_PASSWORD_REQUEST
};
type ReplaceForgottenPasswordSuccess = {
  type: typeof actionTypes.REPLACE_FORGOTTEN_PASSWORD_SUCCESS
};
type ReplaceForgottenPasswordFailure = {
  type: typeof actionTypes.REPLACE_FORGOTTEN_PASSWORD_FAILURE,
  errors: { password: string, passwordConfirmation: string }
};

type Action =
  | ReplaceForgottenPasswordRequest
  | ReplaceForgottenPasswordSuccess
  | ReplaceForgottenPasswordFailure;

export const ApiReducerForgotPassword = (
  state: ApiStatus = initialStatus,
  act: Action
) => {
  switch (act.type) {
    case actionTypes.REPLACE_FORGOTTEN_PASSWORD_REQUEST: {
      const stateChange = fetching;
      return { ...state, ...stateChange };
    }

    case actionTypes.REPLACE_FORGOTTEN_PASSWORD_SUCCESS: {
      const stateChange = retrieving;
      return { ...state, ...stateChange };
    }

    case actionTypes.REPLACE_FORGOTTEN_PASSWORD_FAILURE: {
      const stateChange = failure(act.errors);
      return { ...state, ...stateChange };
    }

    default: {
      return state;
    }
  }
};

export default ApiReducerForgotPassword;
