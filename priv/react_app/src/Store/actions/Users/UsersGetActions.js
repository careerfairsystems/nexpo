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
