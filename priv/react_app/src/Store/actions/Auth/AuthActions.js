import { message } from 'antd';
import { Actions, actionTypes } from '../..';
import API from '../../../API';
import type { Dispatch } from '../../reducers';

export const logout = () => ({
  type: actionTypes.LOGOUT
});

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

export type LoginAction = { email: string, password: string };
export const login = ({ email, password }: LoginAction) => (
  dispatch: Dispatch
) =>
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

export type DevLoginAction = { email: string };
export const developmentLogin = ({ email }: DevLoginAction) => (
  dispatch: Dispatch
) =>
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
