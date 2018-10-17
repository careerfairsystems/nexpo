import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function updateStudentSessionApplIsLoading() {
  return {
    type: actionTypes.PUT_STUDENT_SESSION_APPL
  };
}

export function updateStudentSessionApplSuccess(sessionApplication) {
  message.success('Your Application was successfully updated.');
  return {
    type: actionTypes.PUT_STUDENT_SESSION_APPL_SUCCESS,
    sessionApplication
  };
}

export type UpdateStudentSessionApplFailureAction = {
  type: string
};
export function updateStudentSessionApplFailure(): UpdateStudentSessionApplFailureAction {
  message.warning('Your Application could not be saved');
  return {
    type: actionTypes.PUT_STUDENT_SESSION_APPL_FAILURE
  };
}

export function updateStudentSessionAppl(id, data) {
  return dispatch => {
    dispatch(updateStudentSessionApplIsLoading());
    return API.studentSessions
      .update(id, data)
      .then(application => {
        dispatch(updateStudentSessionApplSuccess(application.data));
      })
      .catch(() => {
        dispatch(updateStudentSessionApplFailure());
      });
  };
}
