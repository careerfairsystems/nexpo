import { reset } from 'redux-form';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function createStudentSessionApplIsLoading() {
  return {
    type: actionTypes.POST_STUDENT_SESSION_APPL
  };
}

export function createStudentSessionApplSuccess(user) {
  message.success('Your Application was successfully saved.');
  return {
    type: actionTypes.POST_STUDENT_SESSION_APPL_SUCCESS,
    user
  };
}

export type CreateStudentSessionApplFailureAction = {
  type: string
};
export function createStudentSessionApplFailure(): CreateStudentSessionApplFailureAction {
  message.warning(
    'Your Application could not be saved, you might have already applied to this company.'
  );

  return {
    type: actionTypes.POST_STUDENT_SESSION_APPL_FAILURE
  };
}

export function createStudentSessionAppl(data) {
  return dispatch => {
    dispatch(createStudentSessionApplIsLoading());
    return API.studentSessions
      .createAppl(data)
      .then(user => {
        dispatch(createStudentSessionApplSuccess(user.data));
        dispatch(reset('studentSession'));
      })
      .catch(() => {
        dispatch(createStudentSessionApplFailure());
      });
  };
}
