import { reset } from 'redux-form';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function createStudentSessionIsLoading() {
  return {
    type: actionTypes.POST_STUDENT_SESSION_APPL
  };
}

export function createStudentSessionSuccess(user) {
  message.success('Student Session was successfully created.');
  return {
    type: actionTypes.POST_STUDENT_SESSION_APPL_SUCCESS,
    user
  };
}

export type CreateStudentSessionFailureAction = {
  type: string
};
export function createStudentSessionFailure(): CreateStudentSessionFailureAction {
  message.warning('Student Session could not be created');

  return {
    type: actionTypes.POST_STUDENT_SESSION_APPL_FAILURE
  };
}

export function createStudentSession(data) {
  return dispatch => {
    dispatch(createStudentSessionIsLoading());
    return API.studentSessions
      .create(data)
      .then(user => {
        dispatch(createStudentSessionSuccess(user.data));
        dispatch(reset('studentSession'));
      })
      .catch(() => {
        dispatch(createStudentSessionFailure());
      });
  };
}
