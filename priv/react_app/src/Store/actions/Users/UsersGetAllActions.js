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
