import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const getMailtemplateIsLoading = () => ({
  type: actionTypes.FETCH_MAILTEMPLATE
});

export const getMailtemplateSuccess = (mailtemplate: {}) => ({
  type: actionTypes.FETCH_MAILTEMPLATE_SUCCESS,
  mailtemplate
});

export type GetMailtemplateFailureAction = {
  type: string
};
export const getMailtemplateFailure = (): GetMailtemplateFailureAction => {
  message.error(
    'Something went wrong when trying to fetch mailtemplate, please try again later'
  );
  return {
    type: actionTypes.FETCH_MAILTEMPLATE_FAILURE
  };
};

export function getMailtemplate(id: string) {
  return (dispatch: Dispatch<{ type: string }>) => {
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
