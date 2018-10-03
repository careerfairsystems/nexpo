import message from 'antd/lib/message';
import { actionTypes } from '../..';
import API from '../../../API';

export function updateStudentSessionApplIsLoading() {
  return {
    type: actionTypes.UPDATE_STUDENT_SESSION_APPL
  };
}

export function updateStudentSessionApplSuccess(user) {
  message.success('Your Application was successfully updated.');
  return {
    type: actionTypes.UPDATE_STUDENT_SESSION_APPL_SUCCESS,
    user
  };
}

export type UpdateStudentSessionApplFailureAction = {
  type: string
};
export function updateStudentSessionApplFailure(): UpdateStudentSessionApplFailureAction {
  message.warning('Your Application could not be saved.');
  return {
    type: actionTypes.UPDATE_STUDENT_SESSION_APPL_FAILURE
  };
}

export function updateStudentSessionAppl(id, data) {
  return dispatch => {
    dispatch(updateStudentSessionApplIsLoading());
    return API.studentSessions
      .update(id, data)
      .then(user => {
        dispatch(updateStudentSessionApplSuccess(user.data));
      })
      .catch(() => {
        dispatch(updateStudentSessionApplFailure());
      });
  };
}
