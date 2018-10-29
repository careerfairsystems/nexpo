import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const getAllMailtemplatesIsLoading = () => ({
  type: actionTypes.FETCH_MAILTEMPLATES
});

export const getAllMailtemplatesSuccess = (mailtemplates: Array<{}>) => ({
  type: actionTypes.FETCH_MAILTEMPLATES_SUCCESS,
  mailtemplates
});

export type GetAllMailtemplatesFailureAction = {
  type: string
};
export const getAllMailtemplatesFailure = (): GetAllMailtemplatesFailureAction => {
  message.error(
    'Something went wrong when trying to fetch all mailtemplates, please try again later'
  );
  return {
    type: actionTypes.FETCH_MAILTEMPLATES_FAILURE
  };
};

export function getAllMailtemplates() {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(getAllMailtemplatesIsLoading());
    return API.mailtemplates
      .getAll()
      .then(mailtemplates => {
        dispatch(getAllMailtemplatesSuccess(mailtemplates.data));
      })
      .catch(() => {
        dispatch(getAllMailtemplatesFailure());
      });
  };
}
