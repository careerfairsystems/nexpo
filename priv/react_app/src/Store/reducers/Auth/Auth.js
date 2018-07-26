import { mergeDeepRight } from 'ramda';
import { actionTypes } from '../..';
import { setJwt, deleteJwt } from '../../../Util/JwtHelper';

export type AuthState = {
  error: boolean,
  isLoggedIn: boolean,
  forgotPassword: {
    validKey: boolean
  }
};

const initialState = {
  error: false,
  isLoggedIn: false,
  forgotPassword: {
    validKey: false
  }
};

export const AuthReducer = (state = initialState, action): AuthState => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      setJwt(action.jwt);
      return mergeDeepRight(state, { error: false, isLoggedIn: true });

    case actionTypes.LOGIN_FAILURE:
      deleteJwt();
      return mergeDeepRight(state, { error: true });

    case actionTypes.FETCH_CURRENT_USER_SUCCESS:
      return mergeDeepRight(state, { isLoggedIn: true });

    case actionTypes.LOGOUT:
    case actionTypes.FETCH_CURRENT_USER_FAILURE:
      deleteJwt();
      return mergeDeepRight(state, { isLoggedIn: false });

    case actionTypes.VERIFY_FORGOT_PASSWORD_KEY_SUCCESS:
      return mergeDeepRight(state, {
        forgotPassword: { validKey: true }
      });

    case actionTypes.VERIFY_FORGOT_PASSWORD_KEY_FAILURE:
      return mergeDeepRight(state, {
        forgotPassword: { validKey: false }
      });

    default:
      return state;
  }
};
