import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function createBulkStudentSessionsIsLoading() {
  return {
    type: actionTypes.POST_STUDENT_SESSION
  };
}

export function createBulkStudentSessionsSuccess(company) {
  message.success('Student Sessions was successfully bulk created.');
  return {
    type: actionTypes.POST_STUDENT_SESSION_SUCCESS,
    company
  };
}

export type CreateBulkStudentSessionsFailureAction = {
  type: string
};
export function createBulkStudentSessionsFailure(): CreateBulkStudentSessionsFailureAction {
  message.warning('Student Sessions could not be bulk created');

  return {
    type: actionTypes.POST_STUDENT_SESSION_FAILURE
  };
}

export function createBulkStudentSessions(data) {
  return dispatch => {
    dispatch(createBulkStudentSessionsIsLoading());
    return API.studentSessions
      .createBulk(data)
      .then(company => {
        dispatch(createBulkStudentSessionsSuccess(company.data));
      })
      .catch(() => {
        dispatch(createBulkStudentSessionsFailure());
      });
  };
}
