import { actionTypes } from '../..';
import API from '../../../API';

export const getCurrentUserStart = () => ({
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
    dispatch(getCurrentUserStart());
    return API.users
      .getMe()
      .then(res => {
        const user = res.data;
        dispatch(getCurrentUserSuccess(user));
      })
      .catch(err => {
        dispatch(getCurrentUserFailure());
      });
  };
}
