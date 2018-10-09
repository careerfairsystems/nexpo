import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function destroyUserIsLoading() {
  return {
    type: actionTypes.DELETE_USER
  };
}

export function destroyUserSuccess(id) {
  message.success('User successfully deleted');
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
    id
  };
}

export type DestroyUserFailureAction = {
  type: string
};
export function destroyUserFailure(): DestroyUserFailureAction {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_USER_FAILURE
  };
}

export function destroyUser(id) {
  return dispatch => {
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
