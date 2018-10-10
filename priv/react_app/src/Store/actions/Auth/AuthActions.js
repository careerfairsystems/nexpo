import message from 'antd/lib/message';
import { Actions, actionTypes } from '../..';
import API from '../../../API';

export function logout() {
  return {
    type: actionTypes.LOGOUT
  };
}

export const loginFailure = () => {
  message.error('That email and password combination is incorrect');
  return {
    type: actionTypes.LOGIN_FAILURE
  };
};

export const loginSuccess = (jwt: string) => ({
  type: actionTypes.LOGIN_SUCCESS,
  jwt
});

export const login = ({ email, password }) => dispatch =>
  API.session
    .login({ email, password })
    .then(res => {
      const { jwt } = res.data;
      dispatch(loginSuccess(jwt));
      dispatch(Actions.users.getCurrentUser());
    })
    .catch(() => {
      dispatch(loginFailure());
    });

export const developmentLogin = email => dispatch =>
  API.session
    .developmentLogin({ email })
    .then(res => {
      const { jwt } = res.data;
      dispatch(loginSuccess(jwt));
      dispatch(Actions.users.getCurrentUser());
    })
    .catch(() => {
      dispatch(loginFailure());
    });
