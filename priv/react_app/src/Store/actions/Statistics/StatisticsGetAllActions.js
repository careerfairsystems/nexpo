import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const getAllStatisticsIsLoading = () => ({
  type: actionTypes.FETCH_STATISTICS
});

export const getAllStatisticsSuccess = (statistics: {}) => ({
  type: actionTypes.FETCH_STATISTICS_SUCCESS,
  statistics
});

export type GetAllStatisticsFailureAction = {
  type: string
};
export const getAllStatisticsFailure = (): GetAllStatisticsFailureAction => {
  message.error(
    'Something went wrong when trying to fetch all statistics, please try again later'
  );
  return {
    type: actionTypes.FETCH_STATISTICS_FAILURE
  };
};

export function getAllStatistics() {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(getAllStatisticsIsLoading());
    return API.statistics
      .getAll()
      .then(statistics => {
        dispatch(getAllStatisticsSuccess(statistics.data));
      })
      .catch(() => {
        dispatch(getAllStatisticsFailure());
      });
  };
}
