import { actionTypes } from '../..';
import API from '../../../API';

export function updateUserIsLoading() {
  return {
    type: actionTypes.PUT_USER
  };
}

export function updateUserSuccess(user) {
  return {
    type: actionTypes.PUT_USER_SUCCESS,
    user
  };
}

export type UpdateUserFailureAction = {
  type: string
};
export function updateUserFailure(): UpdateUserFailureAction {
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
