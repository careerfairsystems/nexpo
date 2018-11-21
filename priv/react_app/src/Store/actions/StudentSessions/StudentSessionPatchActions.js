import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';
import type { Dispatch } from '../../reducers';

export function createBulkStudentSessionsIsLoading() {
  return {
    type: actionTypes.POST_BULK_STUDENT_SESSION
  };
}

export function createBulkStudentSessionsSuccess(studentSessions: {}) {
  message.success('Student Sessions was successfully bulk created.');
  return {
    type: actionTypes.POST_BULK_STUDENT_SESSION_SUCCESS,
    studentSessions
  };
}

export type CreateBulkStudentSessionsFailureAction = {
  type: string
};
export function createBulkStudentSessionsFailure(): CreateBulkStudentSessionsFailureAction {
  message.warning('Student Sessions could not be bulk created');

  return {
    type: actionTypes.POST_BULK_STUDENT_SESSION_FAILURE
  };
}

export function createBulkStudentSessions() {
  return (dispatch: Dispatch) => {
    dispatch(createBulkStudentSessionsIsLoading());
    return API.studentSessions
      .createBulk()
      .then(studentSessions => {
        dispatch(createBulkStudentSessionsSuccess(studentSessions.data));
      })
      .catch(() => {
        dispatch(createBulkStudentSessionsFailure());
      });
  };
}
