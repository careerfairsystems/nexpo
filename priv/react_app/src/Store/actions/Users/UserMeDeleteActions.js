import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const destroyCurrentUserIsLoading = () => ({
  type: actionTypes.DELETE_CURRENT_USER
});

export const destroyCurrentUserSuccess = () => {
  message.success('Your account was successfully deleted');
  return {
    type: actionTypes.DELETE_CURRENT_USER_SUCCESS
  };
};

export const destroyCurrentUserFailure = () => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_CURRENT_USER_FAILURE
  };
};

export function destroyCurrentUser() {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(destroyCurrentUserIsLoading());
    return API.users
      .destroyMe()
      .then(() => {
        dispatch(destroyCurrentUserSuccess());
      })
      .catch(() => {
        dispatch(destroyCurrentUserFailure());
      });
  };
}
