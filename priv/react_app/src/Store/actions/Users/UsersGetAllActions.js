import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const getAllUsersIsLoading = () => ({
  type: actionTypes.FETCH_USERS
});

export const getAllUsersSuccess = (users: Array<{}>) => ({
  type: actionTypes.FETCH_USERS_SUCCESS,
  users
});

export type GetAllUsersFailureAction = {
  type: string
};
export const getAllUsersFailure = (): GetAllUsersFailureAction => {
  message.error(
    'Something went wrong when trying to fetch all users, please try again later'
  );
  return {
    type: actionTypes.FETCH_USERS_FAILURE
  };
};

export function getAllUsers() {
  return (dispatch: Dispatch<{ type: string }>) => {
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
