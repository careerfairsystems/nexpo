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

export function getRoleIsLoading() {
  return {
    type: actionTypes.FETCH_ROLE
  };
}

export function getRoleSuccess(role) {
  return {
    type: actionTypes.FETCH_ROLE_SUCCESS,
    role
  };
}

export type GetRoleFailureAction = {
  type: string
};
export function getRoleFailure(): GetRoleFailureAction {
  return {
    type: actionTypes.FETCH_ROLE_FAILURE
  };
}

export function getRole(id) {
  return dispatch => {
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
