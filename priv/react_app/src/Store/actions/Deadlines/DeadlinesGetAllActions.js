import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const getAllDeadlinesIsLoading = () => ({
  type: actionTypes.FETCH_DEADLINES
});

export const getAllDeadlinesSuccess = (deadlines: Array<{}>) => ({
  type: actionTypes.FETCH_DEADLINES_SUCCESS,
  deadlines
});

export type GetAllDeadlinesFailureAction = {
  type: string
};
export const getAllDeadlinesFailure = (): GetAllDeadlinesFailureAction => {
  message.error(
    'Something went wrong when trying to fetch all deadlines, please try again later'
  );
  return {
    type: actionTypes.FETCH_DEADLINES_FAILURE
  };
};

export function getAllDeadlines() {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(getAllDeadlinesIsLoading());
    return API.deadlines
      .getAll()
      .then(deadlines => {
        dispatch(getAllDeadlinesSuccess(deadlines.data));
      })
      .catch(() => {
        dispatch(getAllDeadlinesFailure());
      });
  };
}
