import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const deleteUserIsLoading = () => ({
  type: actionTypes.DELETE_USER
});

export const deleteUserSuccess = (id: string) => {
  message.success('User successfully deleted');
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
    id
  };
};

export type DestroyUserFailureAction = {
  type: string
};
export const deleteUserFailure = (): DestroyUserFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_USER_FAILURE
  };
};

export function deleteUser(id: string) {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(deleteUserIsLoading());
    return API.users
      .delete(id)
      .then(() => {
        dispatch(deleteUserSuccess(id));
      })
      .catch(() => {
        dispatch(deleteUserFailure());
      });
  };
}
