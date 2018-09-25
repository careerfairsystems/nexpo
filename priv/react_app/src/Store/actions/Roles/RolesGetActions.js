import { actionTypes } from '../..';
import API from '../../../API';

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
