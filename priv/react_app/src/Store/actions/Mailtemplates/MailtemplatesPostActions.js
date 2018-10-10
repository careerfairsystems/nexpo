import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function createMailtemplateIsLoading() {
  return {
    type: actionTypes.POST_MAILTEMPLATE
  };
}

export function createMailtemplateSuccess(mailtemplate) {
  message.success('Mailtemplate successfully created');
  return {
    type: actionTypes.POST_MAILTEMPLATE_SUCCESS,
    mailtemplate
  };
}

export type CreateMailtemplateFailureAction = {
  type: string
};
export function createMailtemplateFailure(): CreateMailtemplateFailureAction {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.POST_MAILTEMPLATE_FAILURE
  };
}

export function createMailtemplate(data) {
  return dispatch => {
    dispatch(createMailtemplateIsLoading());
    return API.mailtemplates
      .create(data)
      .then(mailtemplate => {
        dispatch(createMailtemplateSuccess(mailtemplate.data));
      })
      .catch(() => {
        dispatch(createMailtemplateFailure());
      });
  };
}
