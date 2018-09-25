import { actionTypes } from '../..';
import API from '../../../API';

export const getCurrentUserIsLoading = () => ({
  type: actionTypes.FETCH_CURRENT_USER
});

export const getCurrentUserSuccess = user => ({
  type: actionTypes.FETCH_CURRENT_USER_SUCCESS,
  user
});

export const getCurrentUserFailure = () => ({
  type: actionTypes.FETCH_CURRENT_USER_FAILURE
});

export function getCurrentUser() {
  return dispatch => {
    dispatch(getCurrentUserIsLoading());
    return API.users
      .getMe()
      .then(user => {
        dispatch(getCurrentUserSuccess(user.data));
      })
      .catch(() => {
        dispatch(getCurrentUserFailure());
      });
  };
}
