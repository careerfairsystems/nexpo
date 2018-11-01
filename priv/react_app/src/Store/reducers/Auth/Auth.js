import { actionTypes } from '../..';
import type {} from '../..';
import { setJwt, deleteJwt } from '../../../Util/JwtHelper';

type LOGIN_SUCCESS_ACTION = {
  type: typeof actionTypes.LOGIN_SUCCESS,
  jwt: string
};

type OtherActions = {
  type:
    | typeof actionTypes.LOGIN_FAILURE
    | typeof actionTypes.FETCH_CURRENT_USER_SUCCESS
    | typeof actionTypes.LOGOUT
    | typeof actionTypes.FETCH_CURRENT_USER_FAILURE
    | typeof actionTypes.VERIFY_FORGOT_PASSWORD_KEY_SUCCESS
    | typeof actionTypes.VERIFY_FORGOT_PASSWORD_KEY_FAILURE
};

export type AuthActions = LOGIN_SUCCESS_ACTION | OtherActions;
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

export const AuthReducer = (
  state: AuthState = initialState,
  action: AuthActions
): AuthState => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      setJwt(action.jwt);
      return { ...state, error: false, isLoggedIn: true };

    case actionTypes.LOGIN_FAILURE:
      deleteJwt();
      return { ...state, error: true };

    case actionTypes.FETCH_CURRENT_USER_SUCCESS:
      return { ...state, isLoggedIn: true };

    case actionTypes.LOGOUT:
    case actionTypes.FETCH_CURRENT_USER_FAILURE:
      deleteJwt();
      return { ...state, isLoggedIn: false };

    case actionTypes.VERIFY_FORGOT_PASSWORD_KEY_SUCCESS:
      return {
        ...state,
        forgotPassword: { validKey: true }
      };

    case actionTypes.VERIFY_FORGOT_PASSWORD_KEY_FAILURE:
      return {
        ...state,
        forgotPassword: { validKey: false }
      };

    default:
      return state;
  }
};

export default AuthReducer;
