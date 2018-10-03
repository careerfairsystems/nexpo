import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function getAllRolesIsLoading() {
  return {
    type: actionTypes.FETCH_ROLES
  };
}

export function getAllRolesSuccess(roles) {
  return {
    type: actionTypes.FETCH_ROLES_SUCCESS,
    roles
  };
}

export type GetAllRolesFailureAction = {
  type: string
};
export function getAllRolesFailure(): GetAllRolesFailureAction {
  message.error(
    'Something went wrong when trying to fetch all roles, please try again later'
  );
  return {
    type: actionTypes.FETCH_ROLES_FAILURE
  };
}

export function getAllRoles() {
  return dispatch => {
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
