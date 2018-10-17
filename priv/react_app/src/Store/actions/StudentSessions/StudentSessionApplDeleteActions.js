import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function destroyStudentSessionApplIsLoading() {
  return {
    type: actionTypes.DELETE_STUDENT_SESSION_APPL
  };
}

export function destroyStudentSessionApplSuccess(id) {
  message.success('Your Application was successfully deleted.');
  return {
    type: actionTypes.DELETE_STUDENT_SESSION_APPL_SUCCESS,
    id
  };
}

export type destroyStudentSessionApplFailureAction = {
  type: string
};
export function destroyStudentSessionApplFailure(): destroyStudentSessionApplFailureAction {
  message.warning('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_STUDENT_SESSION_APPL_FAILURE
  };
}

export function destroyStudentSessionAppl(id) {
  return dispatch => {
    dispatch(destroyStudentSessionApplIsLoading());
    return API.studentSessions
      .destroy(id)
      .then(() => {
        dispatch(destroyStudentSessionApplSuccess(id));
      })
      .catch(() => {
        dispatch(destroyStudentSessionApplFailure());
      });
  };
}
