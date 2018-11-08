import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const deleteMailtemplateIsLoading = () => ({
  type: actionTypes.DELETE_MAILTEMPLATE
});

export const deleteMailtemplateSuccess = (id: string) => {
  message.success('Mailtemplate successfully deleted');
  return {
    type: actionTypes.DELETE_MAILTEMPLATE_SUCCESS,
    id
  };
};

export type DestroyMailtemplateFailureAction = {
  type: string
};
export const deleteMailtemplateFailure = (): DestroyMailtemplateFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_MAILTEMPLATE_FAILURE
  };
};

export function deleteMailtemplate(id: string) {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(deleteMailtemplateIsLoading());
    return API.mailtemplates
      .delete(id)
      .then(() => {
        dispatch(deleteMailtemplateSuccess(id));
      })
      .catch(() => {
        dispatch(deleteMailtemplateFailure());
      });
  };
}
