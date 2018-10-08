import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function destroyRoleIsLoading() {
  return {
    type: actionTypes.DELETE_ROLE
  };
}

export function destroyRoleSuccess(id) {
  message.success('Role successfully deleted');
  return {
    type: actionTypes.DELETE_ROLE_SUCCESS,
    id
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
      .then(() => {
        dispatch(destroyRoleSuccess(id));
      })
      .catch(() => {
        dispatch(destroyRoleFailure());
      });
  };
}
