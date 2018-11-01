import { reset } from 'redux-form';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';
import type { Dispatch } from '../../reducers';

export function createStudentSessionIsLoading() {
  return {
    type: actionTypes.POST_STUDENT_SESSION
  };
}

export function createStudentSessionSuccess(company: {}) {
  message.success('Student Session was successfully created.');
  return {
    type: actionTypes.POST_STUDENT_SESSION_SUCCESS,
    company
  };
}

export type CreateStudentSessionFailureAction = {
  type: string
};
export function createStudentSessionFailure(): CreateStudentSessionFailureAction {
  message.warning('Student Session could not be created');

  return {
    type: actionTypes.POST_STUDENT_SESSION_FAILURE
  };
}

export function createStudentSession(data: {}) {
  return (dispatch: Dispatch) => {
    dispatch(createStudentSessionIsLoading());
    return API.studentSessions
      .create(data)
      .then(company => {
        dispatch(createStudentSessionSuccess(company.data));
        dispatch(reset('studentSession'));
      })
      .catch(() => {
        dispatch(createStudentSessionFailure());
      });
  };
}
