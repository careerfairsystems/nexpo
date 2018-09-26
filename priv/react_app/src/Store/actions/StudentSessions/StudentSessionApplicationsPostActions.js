import { actionTypes } from '../..';
import API from '../../../API';

export function createRoleIsLoading() {
  return {
    type: actionTypes.POST_ROLE
  };
}

export function createRoleSuccess(role) {
  return {
    type: actionTypes.POST_ROLE_SUCCESS,
    role
  };
}

export type CreateRoleFailureAction = {
  type: string
};
export function createRoleFailure(): CreateRoleFailureAction {
  return {
    type: actionTypes.POST_ROLE_FAILURE
  };
}

export function createStudentSessionApplication(data) {
  return dispatch => {
    dispatch(createRoleIsLoading());
    return API.studentSessions
      .create(data)
      .then(role => {
        dispatch(createRoleSuccess(role.data));
      })
      .catch(() => {
        dispatch(createRoleFailure());
      });
  };
}
