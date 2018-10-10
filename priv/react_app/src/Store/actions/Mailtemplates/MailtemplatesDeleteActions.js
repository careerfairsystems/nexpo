import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function destroyMailtemplateIsLoading() {
  return {
    type: actionTypes.DELETE_MAILTEMPLATE
  };
}

export function destroyMailtemplateSuccess(id) {
  message.success('Mailtemplate successfully deleted');
  return {
    type: actionTypes.DELETE_MAILTEMPLATE_SUCCESS,
    id
  };
}

export type DestroyMailtemplateFailureAction = {
  type: string
};
export function destroyMailtemplateFailure(): DestroyMailtemplateFailureAction {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_MAILTEMPLATE_FAILURE
  };
}

export function destroyMailtemplate(id) {
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
