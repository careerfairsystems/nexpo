import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function updateDeadlineIsLoading() {
  return {
    type: actionTypes.PUT_DEADLINE
  };
}

export function updateDeadlineSuccess(deadline) {
  message.success('Deadline successfully updated');
  return {
    type: actionTypes.PUT_DEADLINE_SUCCESS,
    deadline
  };
}

export type UpdateDeadlineFailureAction = {
  type: string
};
export function updateDeadlineFailure(): UpdateDeadlineFailureAction {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.PUT_DEADLINE_FAILURE
  };
}

export function updateDeadline(id, data) {
  return dispatch => {
    dispatch(updateDeadlineIsLoading());
    return API.deadlines
      .update(id, data)
      .then(deadline => {
        dispatch(updateDeadlineSuccess(deadline.data));
      })
      .catch(() => {
        dispatch(updateDeadlineFailure());
      });
  };
}
