import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function updateStudentSessionIsLoading() {
  return {
    type: actionTypes.PUT_STUDENT_SESSION
  };
}

export function updateStudentSessionSuccess(sessionApplication) {
  message.success('Your Application was successfully updated.');
  return {
    type: actionTypes.PUT_STUDENT_SESSION_SUCCESS,
    sessionApplication
  };
}

export type UpdateStudentSessionFailureAction = {
  type: string
};
export function updateStudentSessionFailure(): UpdateStudentSessionFailureAction {
  message.warning('Your Application could not be saved.');
  return {
    type: actionTypes.PUT_STUDENT_SESSION_FAILURE
  };
}

export function updateStudentSession(id) {
  return dispatch => {
    dispatch(updateStudentSessionIsLoading());
    return API.studentSessions
      .confirmSession(id)
      .then(session => {
        dispatch(updateStudentSessionSuccess(session.data));
      })
      .catch(() => {
        dispatch(updateStudentSessionFailure());
      });
  };
}
