import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function getAllDeadlinesIsLoading() {
  return {
    type: actionTypes.FETCH_DEADLINES
  };
}

export function getAllDeadlinesSuccess(deadlines) {
  return {
    type: actionTypes.FETCH_DEADLINES_SUCCESS,
    deadlines
  };
}

export type GetAllDeadlinesFailureAction = {
  type: string
};
export function getAllDeadlinesFailure(): GetAllDeadlinesFailureAction {
  message.error(
    'Something went wrong when trying to fetch all deadlines, please try again later'
  );
  return {
    type: actionTypes.FETCH_DEADLINES_FAILURE
  };
}

export function getAllDeadlines() {
  return dispatch => {
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
