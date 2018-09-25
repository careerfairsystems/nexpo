/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

import { Action } from 'redux';
import { ReplaceForgottenPasswordFailureAction } from '../../actions/Accounts/AccountsActions';
import { initialStatus, fetching, retrieving, failure } from './ApiReducer';
import actionTypes from '../../ActionTypes';

export const ApiReducerForgotPassword = (
  state = initialStatus,
  act: Action
): ApiState => {
  switch (act.type) {
    case actionTypes.REPLACE_FORGOTTEN_PASSWORD_REQUEST: {
      const stateChange: ApiState = fetching;
      return { ...state, ...stateChange };
    }

    case actionTypes.REPLACE_FORGOTTEN_PASSWORD_SUCCESS: {
      const stateChange: ApiState = retrieving;
      return { ...state, ...stateChange };
    }

    case actionTypes.REPLACE_FORGOTTEN_PASSWORD_FAILURE: {
      const action: ReplaceForgottenPasswordFailureAction = act;
      const stateChange: ApiState = failure(action.errors);
      return { ...state, ...stateChange };
    }

    default: {
      return state;
    }
  }
};

export default ApiReducerForgotPassword;
