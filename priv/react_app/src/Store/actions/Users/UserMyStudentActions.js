import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const updateCurrentStudentIsLoading = () => ({
  type: actionTypes.PUT_CURRENT_STUDENT
});

export const updateCurrentStudentSuccess = (student: {}) => {
  message.success('Your profile was succefully updated');
  return {
    type: actionTypes.PUT_CURRENT_STUDENT_SUCCESS,
    student
  };
};

export const updateCurrentStudentFailure = () => {
  message.error('Something went wrong, make sure that your CV is a pdf');
  return {
    type: actionTypes.PUT_CURRENT_STUDENT_FAILURE
  };
};

export function updateCurrentStudent(data: {}) {
  return (dispatch: Dispatch<{ type: string }>) => {
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
