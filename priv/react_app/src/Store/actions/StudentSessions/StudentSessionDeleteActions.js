import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function destroyStudentSessionIsLoading() {
  return {
    type: actionTypes.DELETE_STUDENT_SESSION_APPL
  };
}

export function destroyStudentSessionSuccess(id) {
  message.success('Student Session was successfully deleted.');
  return {
    type: actionTypes.DELETE_STUDENT_SESSION_APPL_SUCCESS,
    id
  };
}

export type destroyStudentSessionFailureAction = {
  type: string
};
export function destroyStudentSessionFailure(): destroyStudentSessionFailureAction {
  message.warning('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_STUDENT_SESSION_APPL_FAILURE
  };
}

export function destroyStudentSession(id) {
  return dispatch => {
    dispatch(destroyStudentSessionIsLoading());
    return API.studentSessions
      .destroy(id)
      .then(() => {
        dispatch(destroyStudentSessionSuccess(id));
      })
      .catch(() => {
        dispatch(destroyStudentSessionFailure());
      });
  };
}
