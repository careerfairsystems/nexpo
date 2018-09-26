import { actionTypes } from '../..';
import API from '../../../API';

export function updateRoleIsLoading() {
  return {
    type: actionTypes.PUT_ROLE
  };
}

export function updateRoleSuccess(role) {
  return {
    type: actionTypes.PUT_ROLE_SUCCESS,
    role
  };
}

export type UpdateRoleFailureAction = {
  type: string
};
export function updateRoleFailure(): UpdateRoleFailureAction {
  return {
    type: actionTypes.PUT_ROLE_FAILURE
  };
}

export function updateRole(id, data) {
  return dispatch => {
    dispatch(updateRoleIsLoading());
    return API.roles
      .update(id, data)
      .then(role => {
        dispatch(updateRoleSuccess(role.data));
      })
      .catch(() => {
        dispatch(updateRoleFailure());
      });
  };
}
