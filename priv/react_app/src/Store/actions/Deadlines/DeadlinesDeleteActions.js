import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function destroyDeadlineIsLoading() {
  return {
    type: actionTypes.DELETE_DEADLINE
  };
}

export function destroyDeadlineSuccess(id) {
  message.success('Deadline successfully deleted');
  return {
    type: actionTypes.DELETE_DEADLINE_SUCCESS,
    id
  };
}

export type DestroyDeadlineFailureAction = {
  type: string
};
export function destroyDeadlineFailure(): DestroyDeadlineFailureAction {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_DEADLINE_FAILURE
  };
}

export function destroyDeadline(id) {
  return dispatch => {
    dispatch(destroyDeadlineIsLoading());
    return API.deadlines
      .destroy(id)
      .then(() => {
        dispatch(destroyDeadlineSuccess(id));
      })
      .catch(() => {
        dispatch(destroyDeadlineFailure());
      });
  };
}
