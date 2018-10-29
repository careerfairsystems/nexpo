import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const destroyStudentSessionApplIsLoading = () => ({
  type: actionTypes.DELETE_STUDENT_SESSION_APPL
});

export const destroyStudentSessionApplSuccess = (id: string) => {
  message.success('Your Application was successfully deleted.');
  return {
    type: actionTypes.DELETE_STUDENT_SESSION_APPL_SUCCESS,
    id
  };
};

export type destroyStudentSessionApplFailureAction = {
  type: string
};
export const destroyStudentSessionApplFailure = (): destroyStudentSessionApplFailureAction => {
  message.warning('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_STUDENT_SESSION_APPL_FAILURE
  };
};

export function destroyStudentSessionAppl(id: string) {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(destroyStudentSessionApplIsLoading());
    return API.studentSessions
      .destroy(id)
      .then(() => {
        dispatch(destroyStudentSessionApplSuccess(id));
      })
      .catch(() => {
        dispatch(destroyStudentSessionApplFailure());
      });
  };
}
