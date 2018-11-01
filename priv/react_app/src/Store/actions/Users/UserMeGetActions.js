import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const getCurrentUserIsLoading = () => ({
  type: actionTypes.FETCH_CURRENT_USER
});

export const getCurrentUserSuccess = (user: {}) => ({
  type: actionTypes.FETCH_CURRENT_USER_SUCCESS,
  user
});

export const getCurrentUserFailure = () => {
  message.warning('Unauthorized, please log in');
  return {
    type: actionTypes.FETCH_CURRENT_USER_FAILURE
  };
};

export function getCurrentUser() {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(getCurrentUserIsLoading());
    return API.users
      .getMe()
      .then(user => {
        dispatch(getCurrentUserSuccess(user.data));
      })
      .catch(() => {
        dispatch(getCurrentUserFailure());
      });
  };
}
