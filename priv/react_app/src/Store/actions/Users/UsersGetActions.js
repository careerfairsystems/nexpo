import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function getUserIsLoading() {
  return {
    type: actionTypes.FETCH_USER
  };
}

export function getUserSuccess(user) {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    user
  };
}

export type GetUserFailureAction = {
  type: string
};
export function getUserFailure(): GetUserFailureAction {
  message.error(
    'Something went wrong when trying to fetch user, please try again later'
  );
  return {
    type: actionTypes.FETCH_USER_FAILURE
  };
}

export function getUser(id) {
  return dispatch => {
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
