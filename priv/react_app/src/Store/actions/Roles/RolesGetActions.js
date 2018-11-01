import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const getRoleIsLoading = () => ({
  type: actionTypes.FETCH_ROLE
});

export const getRoleSuccess = (role: { id: number, name: string }) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  role
});

export type GetRoleFailureAction = {
  type: string
};
export const getRoleFailure = (): GetRoleFailureAction => {
  message.error(
    'Something went wrong when trying to fetch role, please try again later'
  );
  return {
    type: actionTypes.FETCH_ROLE_FAILURE
  };
};

export function getRole(id: string) {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(getRoleIsLoading());
    return API.roles
      .get(id)
      .then(role => {
        dispatch(getRoleSuccess(role.data));
      })
      .catch(() => {
        dispatch(getRoleFailure());
      });
  };
}
