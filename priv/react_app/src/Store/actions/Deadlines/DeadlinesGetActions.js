import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const getDeadlineIsLoading = () => ({
  type: actionTypes.FETCH_DEADLINE
});

export const getDeadlineSuccess = (deadline: {}) => ({
  type: actionTypes.FETCH_DEADLINE_SUCCESS,
  deadline
});

export type GetDeadlineFailureAction = {
  type: string
};
export const getDeadlineFailure = (): GetDeadlineFailureAction => {
  message.error(
    'Something went wrong when trying to fetch deadline, please try again later'
  );
  return {
    type: actionTypes.FETCH_DEADLINE_FAILURE
  };
};

export function getDeadline(id: string) {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(getDeadlineIsLoading());
    return API.deadlines
      .get(id)
      .then(deadline => {
        dispatch(getDeadlineSuccess(deadline.data));
      })
      .catch(() => {
        dispatch(getDeadlineFailure());
      });
  };
}
