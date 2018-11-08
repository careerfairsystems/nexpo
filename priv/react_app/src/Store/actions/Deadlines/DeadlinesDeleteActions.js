import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const deleteDeadlineIsLoading = () => {
  return {
    type: actionTypes.DELETE_DEADLINE
  };
}

export const deleteDeadlineSuccess = (id: string) => {
  message.success('Deadline successfully deleted');
  return {
    type: actionTypes.DELETE_DEADLINE_SUCCESS,
    id
  };
}

export type DestroyDeadlineFailureAction = {
  type: string
};
export const deleteDeadlineFailure = (): DestroyDeadlineFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_DEADLINE_FAILURE
  };
}

export function deleteDeadline(id: string) {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(deleteDeadlineIsLoading());
    return API.deadlines
      .delete(id)
      .then(() => {
        dispatch(deleteDeadlineSuccess(id));
      })
      .catch(() => {
        dispatch(deleteDeadlineFailure());
      });
  };
}
