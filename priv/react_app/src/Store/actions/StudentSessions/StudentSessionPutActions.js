import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const updateStudentSessionIsLoading = () => ({
  type: actionTypes.PUT_STUDENT_SESSION
});

export const updateStudentSessionSuccess = (studentSession: {}, state: Number) => {
  if (state==1) {
    message.success('Your Session was successfully confirmed.');
  } else if (state == 2) {
    message.success('Your Session was successfully declined.');	
  }
  return {
    type: actionTypes.PUT_STUDENT_SESSION_SUCCESS,
    studentSession
  };
};

export type UpdateStudentSessionFailureAction = {
  type: string
};
export const updateStudentSessionFailure = (): UpdateStudentSessionFailureAction => {
  message.warning('Something went wrong, please try again later');
  return {
    type: actionTypes.PUT_STUDENT_SESSION_FAILURE
  };
};

export function updateStudentSession(id: string, state: Number) {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(updateStudentSessionIsLoading());
    if (state === 1) {
      return API.studentSessions
      .confirmSession(id)
      .then(session => {
        dispatch(updateStudentSessionSuccess(session.data, 1));
      })
      .catch(() => {
        dispatch(updateStudentSessionFailure());
      });
	  } else if(state === 2) {
		  return API.studentSessions
		  .declineSession(id)
		  .then(session => {
			  dispatch(updateStudentSessionSuccess(session.data, 2));
		  })
		  .catch(() => {
			  dispatch(updateStudentSessionFailure());
		  });
	  }
  };
}
