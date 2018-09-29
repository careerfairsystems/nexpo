import { actionTypes } from '../..';
import API from '../../../API';

export const updateCurrentStudentIsLoading = () => ({
  type: actionTypes.PUT_CURRENT_STUDENT
});

export const updateCurrentStudentSuccess = student => ({
  type: actionTypes.PUT_CURRENT_STUDENT_SUCCESS,
  student
});

export const updateCurrentStudentFailure = () => ({
  type: actionTypes.PUT_CURRENT_STUDENT_FAILURE
});

export function updateCurrentStudent(data) {
  return dispatch => {
    dispatch(updateCurrentStudentIsLoading());
    return API.users
      .updateMyStudent(data)
      .then(student => {
        dispatch(updateCurrentStudentSuccess(student.data));
      })
      .catch(() => {
        dispatch(updateCurrentStudentFailure());
      });
  };
}
