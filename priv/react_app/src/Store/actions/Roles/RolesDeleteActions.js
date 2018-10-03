import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function destroyRoleIsLoading() {
  return {
    type: actionTypes.DELETE_ROLE
  };
}

export function destroyRoleSuccess(role) {
  message.success('Role successfully deleted');
  return {
    type: actionTypes.DELETE_ROLE_SUCCESS,
    role
  };
}

export type DestroyRoleFailureAction = {
  type: string
};
export function destroyRoleFailure(): DestroyRoleFailureAction {
  message.error('Something went wrong, please try again later');
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
