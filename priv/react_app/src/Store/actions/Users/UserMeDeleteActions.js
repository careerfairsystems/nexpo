import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const deleteCurrentUserIsLoading = () => ({
  type: actionTypes.DELETE_CURRENT_USER
});

export const deleteCurrentUserSuccess = () => {
  message.success('Your account was successfully deleted');
  return {
    type: actionTypes.DELETE_CURRENT_USER_SUCCESS
  };
};

export const deleteCurrentUserFailure = () => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_CURRENT_USER_FAILURE
  };
};

export function deleteCurrentUser() {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(deleteCurrentUserIsLoading());
    return API.users
      .deleteMe()
      .then(() => {
        dispatch(deleteCurrentUserSuccess());
      })
      .catch(() => {
        dispatch(deleteCurrentUserFailure());
      });
  };
}
