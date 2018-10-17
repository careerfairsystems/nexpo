import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function getAllProgrammesIsLoading() {
  return {
    type: actionTypes.FETCH_PROGRAMMES
  };
}

export function getAllProgrammesSuccess(programmes) {
  return {
    type: actionTypes.FETCH_PROGRAMMES_SUCCESS,
    programmes
  };
}

export type GetAllProgrammesFailureAction = {
  type: string
};
export function getAllProgrammesFailure(): GetAllProgrammesFailureAction {
  message.error(
    'Something went wrong when trying to fetch all programmes, please try again later'
  );
  return {
    type: actionTypes.FETCH_PROGRAMMES_FAILURE
  };
}

export function getAllProgrammes() {
  return dispatch => {
    dispatch(getAllProgrammesIsLoading());
    return API.programmes
      .getAll()
      .then(programmes => {
        dispatch(getAllProgrammesSuccess(programmes.data));
      })
      .catch(() => {
        dispatch(getAllProgrammesFailure());
      });
  };
}
