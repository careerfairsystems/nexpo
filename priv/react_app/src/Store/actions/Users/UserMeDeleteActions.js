import { actionTypes } from '../..';
import API from '../../../API';

export const destroyCurrentUserIsLoading = () => ({
  type: actionTypes.DELETE_CURRENT_USER
});

export const destroyCurrentUserSuccess = user => ({
  type: actionTypes.DELETE_CURRENT_USER_SUCCESS,
  user
});

export const destroyCurrentUserFailure = () => ({
  type: actionTypes.DELETE_CURRENT_USER_FAILURE
});

export function destroyCurrentUser(id) {
  return dispatch => {
    dispatch(destroyCurrentUserIsLoading());
    return API.users
      .destroyMe(id)
      .then(user => {
        dispatch(destroyCurrentUserSuccess(user.data));
      })
      .catch(() => {
        dispatch(destroyCurrentUserFailure());
      });
  };
}
