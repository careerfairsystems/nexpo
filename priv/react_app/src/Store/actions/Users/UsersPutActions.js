import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function updateUserIsLoading() {
  return {
    type: actionTypes.PUT_USER
  };
}

export function updateUserSuccess(user) {
  message.success('User successfully updated');
  return {
    type: actionTypes.PUT_USER_SUCCESS,
    user
  };
}

export type UpdateUserFailureAction = {
  type: string
};
export function updateUserFailure(): UpdateUserFailureAction {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.PUT_USER_FAILURE
  };
}

export function updateUser(id, data) {
  return dispatch => {
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
