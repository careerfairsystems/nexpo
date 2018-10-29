import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const getAllProgrammesIsLoading = () => ({
  type: actionTypes.FETCH_PROGRAMMES
});

export const getAllProgrammesSuccess = (programmes: Array<{}>) => ({
  type: actionTypes.FETCH_PROGRAMMES_SUCCESS,
  programmes
});

export type GetAllProgrammesFailureAction = {
  type: string
};
export const getAllProgrammesFailure = (): GetAllProgrammesFailureAction => {
  message.error(
    'Something went wrong when trying to fetch all programmes, please try again later'
  );
  return {
    type: actionTypes.FETCH_PROGRAMMES_FAILURE
  };
};

export function getAllProgrammes() {
  return (dispatch: Dispatch<{ type: string }>) => {
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
