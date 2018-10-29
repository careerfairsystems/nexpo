import type { Dispatch } from 'redux';
import { reset } from 'redux-form';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const createRoleIsLoading = () => ({
  type: actionTypes.POST_ROLE
});

export const createRoleSuccess = (role: {}) => {
  message.success('Role successfully created');
  return {
    type: actionTypes.POST_ROLE_SUCCESS,
    role
  };
};

export type CreateRoleFailureAction = {
  type: string
};
export const createRoleFailure = (): CreateRoleFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.POST_ROLE_FAILURE
  };
};

export function createRole(data: {}) {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(createRoleIsLoading());
    return API.roles
      .create(data)
      .then(role => {
        dispatch(createRoleSuccess(role.data));
        dispatch(reset('role'));
      })
      .catch(() => {
        dispatch(createRoleFailure());
      });
  };
}
