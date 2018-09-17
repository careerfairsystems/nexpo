/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

import { Action } from 'redux';
import { actionTypes } from '../..';
import { ReplaceForgottenPasswordFailureAction } from '../../actions/Accounts/AccountsActions';

type ApiStatus = {
  fetching: boolean,
  success: boolean
};

export type ApiState = {
  categories: ApiStatus,
  companies: ApiStatus,
  current_user: ApiStatus,
  forgot_password: ApiStatus,
  login: ApiStatus,
  replace_password: ApiStatus & {
    errors: {
      password: string[],
      password_confirmation: string[]
    }
  },
  verify_forgot_password_key: ApiStatus
};

const initialState: ApiState = [
  'categories',
  'companies',
  'current_user',
  'forgot_password',
  'login',
  'replace_password',
  'verify_forgot_password_key'
].reduce(
  (acc, curr) => ({
    ...acc,
    [curr]: {
      fetching: false,
      errors: undefined,
      success: false
    }
  }),
  {}
);

export const ApiReducer = (state = initialState, act: Action): ApiState => {
  switch (act.type) {
    case actionTypes.FETCH_COMPANIES: {
      const stateChange: ApiState = {
        companies: {
          fetching: true,
          errors: undefined,
          success: false
        }
      };
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_COMPANIES_SUCCESS: {
      const stateChange: ApiState = {
        companies: {
          fetching: false,
          errors: undefined,
          success: true
        }
      };
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_COMPANIES_FAILURE: {
      const stateChange: ApiState = {
        companies: {
          fetching: false,
          errors: ['There was an error'],
          success: false
        }
      };
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_CATEGORIES: {
      const stateChange: ApiState = {
        categories: {
          fetching: true,
          errors: undefined,
          success: false
        }
      };
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_CATEGORIES_SUCCESS: {
      const stateChange: ApiState = {
        categories: {
          fetching: false,
          errors: undefined,
          success: true
        }
      };
      return { ...state, ...stateChange };
    }

    case actionTypes.FETCH_CATEGORIES_FAILURE: {
      const stateChange: ApiState = {
        categories: {
          fetching: false,
          errors: ['There was an error'],
          success: false
        }
      };
      return { ...state, ...stateChange };
    }

    case actionTypes.FORGOT_PASSWORD_REQUEST: {
      const stateChange: ApiState = {
        forgot_password: {
          fetching: true,
          errors: undefined,
          success: false
        }
      };
      return { ...state, ...stateChange };
    }

    case actionTypes.FORGOT_PASSWORD_SUCCESS: {
      const stateChange: ApiState = {
        forgot_password: {
          fetching: false,
          errors: undefined,
          success: true
        }
      };
      return { ...state, ...stateChange };
    }

    case actionTypes.REPLACE_FORGOTTEN_PASSWORD_REQUEST: {
      const stateChange: ApiState = {
        replace_password: {
          fetching: true,
          errors: undefined,
          success: false
        }
      };
      return { ...state, ...stateChange };
    }

    case actionTypes.REPLACE_FORGOTTEN_PASSWORD_SUCCESS: {
      const stateChange: ApiState = {
        replace_password: {
          fetching: false,
          errors: undefined,
          success: true
        }
      };
      return { ...state, ...stateChange };
    }

    case actionTypes.REPLACE_FORGOTTEN_PASSWORD_FAILURE: {
      const action: ReplaceForgottenPasswordFailureAction = act;
      const stateChange: ApiState = {
        replace_password: {
          fetching: false,
          errors: action.errors,
          success: false
        }
      };
      return { ...state, ...stateChange };
    }

    default: {
      return state;
    }
  }
};

export default ApiReducer;
