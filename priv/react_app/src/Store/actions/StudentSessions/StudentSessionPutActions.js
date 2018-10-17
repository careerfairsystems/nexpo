import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function updateStudentSessionIsLoading() {
  return {
    type: actionTypes.PUT_STUDENT_SESSION
  };
}

export function updateStudentSessionSuccess(studentSession) {
  message.success('Your Session was successfully confirmed.');
  return {
    type: actionTypes.PUT_STUDENT_SESSION_SUCCESS,
    studentSession
  };
}

export type UpdateStudentSessionFailureAction = {
  type: string
};
export function updateStudentSessionFailure(): UpdateStudentSessionFailureAction {
  message.warning('Something went wrong, please try again later.');
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