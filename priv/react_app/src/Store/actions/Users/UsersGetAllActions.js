import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function getAllUsersIsLoading() {
  return {
    type: actionTypes.FETCH_USERS
  };
}

export function getAllUsersSuccess(users) {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    users
  };
}

export type GetAllUsersFailureAction = {
  type: string
};
export function getAllUsersFailure(): GetAllUsersFailureAction {
  message.error(
    'Something went wrong when trying to fetch all users, please try again later'
  );
  return {
    type: actionTypes.FETCH_USERS_FAILURE
  };
}

export function getAllUsers() {
  return dispatch => {
    dispatch(getAllUsersIsLoading());
    return API.users
      .getAll()
      .then(users => {
        dispatch(getAllUsersSuccess(users.data));
      })
      .catch(() => {
        dispatch(getAllUsersFailure());
      });
  };
}
