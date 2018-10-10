import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function getAllMailtemplatesIsLoading() {
  return {
    type: actionTypes.FETCH_MAILTEMPLATES
  };
}

export function getAllMailtemplatesSuccess(mailtemplates) {
  return {
    type: actionTypes.FETCH_MAILTEMPLATES_SUCCESS,
    mailtemplates
  };
}

export type GetAllMailtemplatesFailureAction = {
  type: string
};
export function getAllMailtemplatesFailure(): GetAllMailtemplatesFailureAction {
  message.error(
    'Something went wrong when trying to fetch all mailtemplates, please try again later'
  );
  return {
    type: actionTypes.FETCH_MAILTEMPLATES_FAILURE
  };
}

export function getAllMailtemplates() {
  return dispatch => {
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
