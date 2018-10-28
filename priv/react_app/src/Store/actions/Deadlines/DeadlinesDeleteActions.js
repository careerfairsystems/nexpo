import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const destroyDeadlineIsLoading = () => {
  return {
    type: actionTypes.DELETE_DEADLINE
  };
}

export const destroyDeadlineSuccess = (id: string) => {
  message.success('Deadline successfully deleted');
  return {
    type: actionTypes.DELETE_DEADLINE_SUCCESS,
    id
  };
}

export type DestroyDeadlineFailureAction = {
  type: string
};
export const destroyDeadlineFailure = (): DestroyDeadlineFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_DEADLINE_FAILURE
  };
}

export function destroyDeadline(id: string) {
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
