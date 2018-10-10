import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function getMailtemplateIsLoading() {
  return {
    type: actionTypes.FETCH_MAILTEMPLATE
  };
}

export function getMailtemplateSuccess(mailtemplate) {
  return {
    type: actionTypes.FETCH_MAILTEMPLATE_SUCCESS,
    mailtemplate
  };
}

export type GetMailtemplateFailureAction = {
  type: string
};
export function getMailtemplateFailure(): GetMailtemplateFailureAction {
  message.error(
    'Something went wrong when trying to fetch mailtemplate, please try again later'
  );
  return {
    type: actionTypes.FETCH_MAILTEMPLATE_FAILURE
  };
}

export function getMailtemplate(id) {
  return dispatch => {
    dispatch(getMailtemplateIsLoading());
    return API.mailtemplates
      .get(id)
      .then(mailtemplate => {
        dispatch(getMailtemplateSuccess(mailtemplate.data));
      })
      .catch(() => {
        dispatch(getMailtemplateFailure());
      });
  };
}
