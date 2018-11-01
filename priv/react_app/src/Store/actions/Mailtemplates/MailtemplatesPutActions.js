import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const updateMailtemplateIsLoading = () => ({
  type: actionTypes.PUT_MAILTEMPLATE
});

export const updateMailtemplateSuccess = (mailtemplate: {}) => {
  message.success('Mailtemplate successfully updated');
  return {
    type: actionTypes.PUT_MAILTEMPLATE_SUCCESS,
    mailtemplate
  };
};

export type UpdateMailtemplateFailureAction = {
  type: string
};
export const updateMailtemplateFailure = (): UpdateMailtemplateFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.PUT_MAILTEMPLATE_FAILURE
  };
};

export function updateMailtemplate(id: string, data: {}) {
  return (dispatch: Dispatch<{ type: string }>) => {
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
