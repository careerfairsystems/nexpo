import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function getProgrammeIsLoading() {
  return {
    type: actionTypes.FETCH_PROGRAMME
  };
}

export function getProgrammeSuccess(programme) {
  return {
    type: actionTypes.FETCH_PROGRAMME_SUCCESS,
    programme
  };
}

export type GetProgrammeFailureAction = {
  type: string
};
export function getProgrammeFailure(): GetProgrammeFailureAction {
  message.error(
    'Something went wrong when trying to fetch Programme, please try again later'
  );
  return {
    type: actionTypes.FETCH_PROGRAMME_FAILURE
  };
}

export function getProgramme(id) {
  return dispatch => {
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
