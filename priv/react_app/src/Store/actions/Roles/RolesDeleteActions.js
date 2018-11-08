import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const deleteRoleIsLoading = () => ({
  type: actionTypes.DELETE_ROLE
});

export const deleteRoleSuccess = (id: string) => {
  message.success('Role successfully deleted');
  return {
    type: actionTypes.DELETE_ROLE_SUCCESS,
    id
  };
};

export type DestroyRoleFailureAction = {
  type: string
};
export const deleteRoleFailure = (): DestroyRoleFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_ROLE_FAILURE
  };
};

export function deleteRole(id: string) {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(deleteRoleIsLoading());
    return API.roles
      .delete(id)
      .then(() => {
        dispatch(deleteRoleSuccess(id));
      })
      .catch(() => {
        dispatch(deleteRoleFailure());
      });
  };
}
