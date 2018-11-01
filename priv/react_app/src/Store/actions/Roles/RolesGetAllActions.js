import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const getAllRolesIsLoading = () => ({
  type: actionTypes.FETCH_ROLES
});

export const getAllRolesSuccess = (roles: Array<{}>) => ({
  type: actionTypes.FETCH_ROLES_SUCCESS,
  roles
});

export type GetAllRolesFailureAction = {
  type: string
};
export const getAllRolesFailure = (): GetAllRolesFailureAction => {
  message.error(
    'Something went wrong when trying to fetch all roles, please try again later'
  );
  return {
    type: actionTypes.FETCH_ROLES_FAILURE
  };
};

export function getAllRoles() {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(getAllRolesIsLoading());
    return API.roles
      .getAll()
      .then(roles => {
        dispatch(getAllRolesSuccess(roles.data));
      })
      .catch(() => {
        dispatch(getAllRolesFailure());
      });
  };
}
