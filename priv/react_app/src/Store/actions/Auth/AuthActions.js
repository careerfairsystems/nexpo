import { Actions, actionTypes } from '../..';
import API from '../../../API';

export function logout() {
  return {
    type: actionTypes.LOGOUT
  };
}

export const loginFailure = () => ({
  type: actionTypes.LOGIN_FAILURE
});

export const loginSuccess = (jwt: string) => ({
  type: actionTypes.LOGIN_SUCCESS,
  jwt
});

export const login = ({ email, password }) => dispatch =>
  API.session
    .login({ email, password })
    .then(res => {
      const jwt = res.data.jwt;
      dispatch(loginSuccess(jwt));
      dispatch(Actions.users.getCurrentUser());
    })
    .catch(err => {
      dispatch(loginFailure());
    });

export const development_login = email => dispatch =>
  API.session
    .development_login({ email })
    .then(res => {
      const jwt = res.data.jwt;
      dispatch(loginSuccess(jwt));
      dispatch(Actions.users.getCurrentUser());
    })
    .catch(err => {
      dispatch(loginFailure());
    });
