import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const createUserIsLoading = () => ({
  type: actionTypes.POST_USER
});

export const createUserSuccess = (user: {}) => {
  message.success('User successfully created');
  return {
    type: actionTypes.POST_USER_SUCCESS,
    user
  };
};

export type CreateUserFailureAction = {
  type: string
};
export const createUserFailure = (): CreateUserFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.POST_USER_FAILURE
  };
};

export function createUser(data: {}) {
  return (dispatch: Dispatch<{ type: string }>) => {
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
