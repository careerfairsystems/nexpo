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

export const AuthReducer = (
  state: AuthState = initialState,
  action: { type: string }
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
