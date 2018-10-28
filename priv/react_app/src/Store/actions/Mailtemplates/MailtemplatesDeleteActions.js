import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const destroyMailtemplateIsLoading = () => ({
  type: actionTypes.DELETE_MAILTEMPLATE
});

export const destroyMailtemplateSuccess = (id: string) => {
  message.success('Mailtemplate successfully deleted');
  return {
    type: actionTypes.DELETE_MAILTEMPLATE_SUCCESS,
    id
  };
};

export type DestroyMailtemplateFailureAction = {
  type: string
};
export const destroyMailtemplateFailure = (): DestroyMailtemplateFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_MAILTEMPLATE_FAILURE
  };
};

export function destroyMailtemplate(id: string) {
  return dispatch => {
    dispatch(destroyMailtemplateIsLoading());
    return API.mailtemplates
      .destroy(id)
      .then(() => {
        dispatch(destroyMailtemplateSuccess(id));
      })
      .catch(() => {
        dispatch(destroyMailtemplateFailure());
      });
  };
}
