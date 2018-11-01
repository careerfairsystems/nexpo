import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const createDeadlineIsLoading = () => ({
  type: actionTypes.POST_DEADLINE
});

export const createDeadlineSuccess = (deadline: {}) => {
  message.success('Deadline successfully created');
  return {
    type: actionTypes.POST_DEADLINE_SUCCESS,
    deadline
  };
};

export type CreateDeadlineFailureAction = {
  type: string
};
export const createDeadlineFailure = (): CreateDeadlineFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.POST_DEADLINE_FAILURE
  };
};

export function createDeadline(data: {}) {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(createDeadlineIsLoading());
    return API.deadlines
      .create(data)
      .then(deadline => {
        dispatch(createDeadlineSuccess(deadline.data));
      })
      .catch(() => {
        dispatch(createDeadlineFailure());
      });
  };
}
