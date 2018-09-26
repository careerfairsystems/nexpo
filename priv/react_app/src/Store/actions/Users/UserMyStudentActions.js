import { actionTypes } from '../..';
import API from '../../../API';

export const updateCurrentStudentIsLoading = () => ({
  type: actionTypes.PUT_CURRENT_STUDENT
});

export const updateCurrentStudentSuccess = user => ({
  type: actionTypes.PUT_CURRENT_STUDENT_SUCCESS,
  user
});

export const updateCurrentStudentFailure = () => ({
  type: actionTypes.PUT_CURRENT_STUDENT_FAILURE
});

export function updateCurrentStudent(data) {
  return dispatch => {
    dispatch(updateCurrentStudentIsLoading());
    return API.users
      .updateMyStudent(data)
      .then(user => {
        dispatch(updateCurrentStudentSuccess(user.data));
      })
      .catch(() => {
        dispatch(updateCurrentStudentFailure());
      });
  };
}
