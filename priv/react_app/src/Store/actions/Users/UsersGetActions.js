import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const getUserIsLoading = () => ({
  type: actionTypes.FETCH_USER
});

export const getUserSuccess = (user: {}) => ({
  type: actionTypes.FETCH_USER_SUCCESS,
  user
});

export type GetUserFailureAction = {
  type: string
};
export const getUserFailure = (): GetUserFailureAction => {
  message.error(
    'Something went wrong when trying to fetch user, please try again later'
  );
  return {
    type: actionTypes.FETCH_USER_FAILURE
  };
};

export function getUser(id: string) {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(getUserIsLoading());
    return API.users
      .get(id)
      .then(user => {
        dispatch(getUserSuccess(user.data));
      })
      .catch(() => {
        dispatch(getUserFailure());
      });
  };
}
