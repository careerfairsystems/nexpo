import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function updateRoleIsLoading() {
  return {
    type: actionTypes.PUT_ROLE
  };
}

export function updateRoleSuccess(role) {
  message.success('Role successfully updated');
  return {
    type: actionTypes.PUT_ROLE_SUCCESS,
    role
  };
}

export type UpdateRoleFailureAction = {
  type: string
};
export function updateRoleFailure(): UpdateRoleFailureAction {
  message.error('Something went wrong, please try again later');
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
