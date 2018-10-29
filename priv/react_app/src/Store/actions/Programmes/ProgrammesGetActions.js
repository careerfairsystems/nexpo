import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const getProgrammeIsLoading = () => ({
  type: actionTypes.FETCH_PROGRAMME
});

export const getProgrammeSuccess = (programme: {}) => ({
  type: actionTypes.FETCH_PROGRAMME_SUCCESS,
  programme
});

export type GetProgrammeFailureAction = {
  type: string
};
export const getProgrammeFailure = (): GetProgrammeFailureAction => {
  message.error(
    'Something went wrong when trying to fetch Programme, please try again later'
  );
  return {
    type: actionTypes.FETCH_PROGRAMME_FAILURE
  };
};

export function getProgramme(id: string) {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(getProgrammeIsLoading());
    return API.programmes
      .get(id)
      .then(programme => {
        dispatch(getProgrammeSuccess(programme.data));
      })
      .catch(() => {
        dispatch(getProgrammeFailure());
      });
  };
}
