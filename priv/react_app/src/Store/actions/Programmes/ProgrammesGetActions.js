import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function getProgrammeIsLoading() {
  return {
    type: actionTypes.FETCH_PROGRAMME
  };
}

export function getProgrammeSuccess(Programme) {
  return {
    type: actionTypes.FETCH_PROGRAMME_SUCCESS,
    Programme
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
    return API.Programmes
      .get(id)
      .then(Programme => {
        dispatch(getProgrammeSuccess(Programme.data));
      })
      .catch(() => {
        dispatch(getProgrammeFailure());
      });
  };
}
