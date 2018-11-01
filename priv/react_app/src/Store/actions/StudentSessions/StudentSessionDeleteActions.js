import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';
import type { Dispatch } from '../../reducers';

export function destroyStudentSessionIsLoading() {
  return {
    type: actionTypes.DELETE_STUDENT_SESSION
  };
}

export function destroyStudentSessionSuccess(id: string) {
  message.success('Student Session was successfully deleted.');
  return {
    type: actionTypes.DELETE_STUDENT_SESSION_SUCCESS,
    id
  };
}

export type destroyStudentSessionFailureAction = {
  type: string
};
export function destroyStudentSessionFailure(): destroyStudentSessionFailureAction {
  message.warning('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_STUDENT_SESSION_FAILURE
  };
}

export function destroyStudentSession(id: string) {
  return (dispatch: Dispatch) => {
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
