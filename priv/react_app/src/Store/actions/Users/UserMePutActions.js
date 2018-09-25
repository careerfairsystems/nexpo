import { actionTypes } from '../..';
import API from '../../../API';

export const updateCurrentUserIsLoading = () => ({
  type: actionTypes.PUT_CURRENT_USER
});

export const updateCurrentUserSuccess = user => ({
  type: actionTypes.PUT_CURRENT_USER_SUCCESS,
  user
});

export const updateCurrentUserFailure = () => ({
  type: actionTypes.PUT_CURRENT_USER_FAILURE
});

export function updateCurrentUser(data) {
  return dispatch => {
    dispatch(updateCurrentUserIsLoading());
    return API.users
      .updateMe(data)
      .then(user => {
        dispatch(updateCurrentUserSuccess(user.data));
      })
      .catch(() => {
        dispatch(updateCurrentUserFailure());
      });
  };
}
