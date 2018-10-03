import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function createUserIsLoading() {
  return {
    type: actionTypes.POST_USER
  };
}

export function createUserSuccess(user) {
  message.success('User successfully created');
  return {
    type: actionTypes.POST_USER_SUCCESS,
    user
  };
}

export type CreateUserFailureAction = {
  type: string
};
export function createUserFailure(): CreateUserFailureAction {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.POST_USER_FAILURE
  };
}

export function createUser(data) {
  return dispatch => {
    dispatch(createUserIsLoading());
    return API.users
      .create(data)
      .then(user => {
        dispatch(createUserSuccess(user.data));
      })
      .catch(() => {
        dispatch(createUserFailure());
      });
  };
}
