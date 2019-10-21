import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';
import type { Dispatch } from '../../reducers';

export function deleteStudentSessionIsLoading() {
  return {
    type: actionTypes.DELETE_STUDENT_SESSION
  };
}

export function deleteStudentSessionSuccess(company: {}) {
  message.success('Student Session was successfully deleted.');
  return {
    type: actionTypes.DELETE_STUDENT_SESSION_SUCCESS,
    company
  };
}

export function deleteStudentSessionFailure() {
  message.warning('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_STUDENT_SESSION_FAILURE
  };
}

export function deleteStudentSession(id: string) {
  return (dispatch: Dispatch) => {
    dispatch(deleteStudentSessionIsLoading());
    return API.studentSessions
      .delete(id)
      .then(company => {
        dispatch(deleteStudentSessionSuccess(company.data));
      })
      .catch(() => {
        dispatch(deleteStudentSessionFailure());
      });
  };
}
