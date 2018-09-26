import { actionTypes } from '../..';
import API from '../../../API';

export function destroyRoleIsLoading() {
  return {
    type: actionTypes.DELETE_ROLE
  };
}

export function destroyRoleSuccess(role) {
  return {
    type: actionTypes.DELETE_ROLE_SUCCESS,
    role
  };
}

export type DestroyRoleFailureAction = {
  type: string
};
export function destroyRoleFailure(): DestroyRoleFailureAction {
  return {
    type: actionTypes.DELETE_ROLE_FAILURE
  };
}

export function destroyRole(id) {
  return dispatch => {
    dispatch(destroyRoleIsLoading());
    return API.roles
      .destroy(id)
      .then(role => {
        dispatch(destroyRoleSuccess(role.data));
      })
      .catch(() => {
        dispatch(destroyRoleFailure());
      });
  };
}
