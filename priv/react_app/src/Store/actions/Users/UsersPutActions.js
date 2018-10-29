import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const updateUserIsLoading = () => ({
  type: actionTypes.PUT_USER
});

export const updateUserSuccess = (user: {}) => {
  message.success('User successfully updated');
  return {
    type: actionTypes.PUT_USER_SUCCESS,
    user
  };
};

export type UpdateUserFailureAction = {
  type: string
};
export const updateUserFailure = (): UpdateUserFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.PUT_USER_FAILURE
  };
};

export function updateUser(id: string, data: {}) {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(updateUserIsLoading());
    return API.users
      .update(id, data)
      .then(user => {
        dispatch(updateUserSuccess(user.data));
      })
      .catch(() => {
        dispatch(updateUserFailure());
      });
  };
}
