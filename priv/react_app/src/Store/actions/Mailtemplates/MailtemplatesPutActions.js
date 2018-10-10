import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function updateMailtemplateIsLoading() {
  return {
    type: actionTypes.PUT_MAILTEMPLATE
  };
}

export function updateMailtemplateSuccess(mailtemplate) {
  message.success('Mailtemplate successfully updated');
  return {
    type: actionTypes.PUT_MAILTEMPLATE_SUCCESS,
    mailtemplate
  };
}

export type UpdateMailtemplateFailureAction = {
  type: string
};
export function updateMailtemplateFailure(): UpdateMailtemplateFailureAction {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.PUT_MAILTEMPLATE_FAILURE
  };
}

export function updateMailtemplate(id, data) {
  return dispatch => {
    dispatch(updateMailtemplateIsLoading());
    return API.mailtemplates
      .update(id, data)
      .then(mailtemplate => {
        dispatch(updateMailtemplateSuccess(mailtemplate.data));
      })
      .catch(() => {
        dispatch(updateMailtemplateFailure());
      });
  };
}
