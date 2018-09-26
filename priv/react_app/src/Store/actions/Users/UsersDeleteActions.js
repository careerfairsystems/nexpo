import { actionTypes } from '../..';
import API from '../../../API';

export function destroyUserIsLoading() {
  return {
    type: actionTypes.DELETE_USER
  };
}

export function destroyUserSuccess(user) {
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
    user
  };
}

export type DestroyUserFailureAction = {
  type: string
};
export function destroyUserFailure(): DestroyUserFailureAction {
  return {
    type: actionTypes.DELETE_USER_FAILURE
  };
}

export function destroyUser(id) {
  return dispatch => {
    dispatch(destroyUserIsLoading());
    return API.users
      .destroy(id)
      .then(user => {
        dispatch(destroyUserSuccess(user.data));
      })
      .catch(() => {
        dispatch(destroyUserFailure());
      });
  };
}
