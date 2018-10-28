import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const updateStudentSessionIsLoading = () => ({
  type: actionTypes.PUT_STUDENT_SESSION
});

export const updateStudentSessionSuccess = (studentSession: {}) => {
  message.success('Your Session was successfully confirmed.');
  return {
    type: actionTypes.PUT_STUDENT_SESSION_SUCCESS,
    studentSession
  };
};

export type UpdateStudentSessionFailureAction = {
  type: string
};
export const updateStudentSessionFailure = (): UpdateStudentSessionFailureAction => {
  message.warning('Something went wrong, please try again later');
  return {
    type: actionTypes.PUT_STUDENT_SESSION_FAILURE
  };
};

export function updateStudentSession(id: string) {
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
