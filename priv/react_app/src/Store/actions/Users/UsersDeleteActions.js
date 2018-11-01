import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const destroyUserIsLoading = () => ({
  type: actionTypes.DELETE_USER
});

export const destroyUserSuccess = (id: string) => {
  message.success('User successfully deleted');
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
    id
  };
};

export type DestroyUserFailureAction = {
  type: string
};
export const destroyUserFailure = (): DestroyUserFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_USER_FAILURE
  };
};

export function destroyUser(id: string) {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(destroyUserIsLoading());
    return API.users
      .destroy(id)
      .then(() => {
        dispatch(destroyUserSuccess(id));
      })
      .catch(() => {
        dispatch(destroyUserFailure());
      });
  };
}
