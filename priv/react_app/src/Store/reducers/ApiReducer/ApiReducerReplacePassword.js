/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

import type { ReplaceForgottenPasswordFailureAction } from '../../actions/Accounts/AccountsActions';
import { initialStatus, fetching, retrieving, failure } from './ApiReducer';
import actionTypes from '../../ActionTypes';
import type { ApiStatus } from './ApiReducer';

export const ApiReducerForgotPassword = (
  state: ApiStatus = initialStatus,
  act: { type: string }
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
      const action: ReplaceForgottenPasswordFailureAction = act;
      const stateChange = failure(action.errors);
      return { ...state, ...stateChange };
    }

    default: {
      return state;
    }
  }
};

export default ApiReducerForgotPassword;
