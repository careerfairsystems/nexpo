/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

import { actionTypes } from './../../../Store'
import { mergeDeepRight } from 'ramda'
import { Action } from 'redux';
import { ReplaceForgottenPasswordFailureAction } from '../../actions/Accounts/AccountsActions';

type ApiStatus = {
  fetching: boolean
}

export type ApiState = {
  companies: ApiStatus,
  current_user: ApiStatus,
  forgot_password: ApiStatus,
  login: ApiStatus,
  replace_password: ApiStatus & {
    errors: {
      password: string[],
      password_confirmation: string[]
    },
    success: boolean
  },
  verify_forgot_password_key: ApiStatus
}

const initialState: ApiState = {
  companies: {
    fetching: false, errors: undefined
  },
  current_user: {
    fetching: false, errors: undefined
  },
  forgot_password: {
    fetching: false, errors: undefined
  },
  login: {
    fetching: false, errors: undefined
  },
  replace_password: {
    fetching: false, errors: undefined, success: false,
  },
  verify_forgot_password_key: {
    fetching: false, errors: undefined
  }
}

export const ApiReducer = (state = initialState, act: Action): ApiState => {

  switch (act.type) {

    case actionTypes.FETCH_COMPANIES: {
      const stateChange: ApiState = {
        companies: { fetching: true, errors: undefined }
      }
      return mergeDeepRight(state, stateChange)
    }

    case actionTypes.FETCH_COMPANIES_SUCCESS: {
      const stateChange: ApiState = {
        companies: { fetching: false, errors: undefined }
      }
      return mergeDeepRight(state, stateChange)
    }

    case actionTypes.FETCH_COMPANIES_FAILURE: {
      const stateChange: ApiState = {
        companies: { fetching: false, errors: ['There was an error'] }
      }
      return mergeDeepRight(state, stateChange)
    }

    case actionTypes.FORGOT_PASSWORD_REQUEST: {
      const stateChange: ApiState = {
        forgot_password: { fetching: true, errors: undefined }
      }
      return mergeDeepRight(state, stateChange)
    }

    case actionTypes.FORGOT_PASSWORD_SUCCESS: {
      const stateChange: ApiState = {
        forgot_password: { fetching: false, errors: undefined }
      }
      return mergeDeepRight(state, stateChange)
    }

    case actionTypes.REPLACE_FORGOTTEN_PASSWORD_REQUEST: {
      const stateChange: ApiState = {
        replace_password: { fetching: true, errors: undefined }
      }
      return mergeDeepRight(state, stateChange)
    }

    case actionTypes.REPLACE_FORGOTTEN_PASSWORD_SUCCESS: {
      const stateChange: ApiState = {
        replace_password: {
          fetching: false,
          errors: undefined,
          success: true
        }
      }
      return mergeDeepRight(state, stateChange)
    }

    case actionTypes.REPLACE_FORGOTTEN_PASSWORD_FAILURE: {
      const action: ReplaceForgottenPasswordFailureAction = act
      const stateChange: ApiState = {
        replace_password: { fetching: false, errors: action.errors }
      }
      return mergeDeepRight(state, stateChange)
    }

    default: {
      return state;
    }

  }
}

