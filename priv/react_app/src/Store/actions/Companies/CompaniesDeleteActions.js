import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function destroyCompanyIsLoading() {
  return {
    type: actionTypes.DELETE_COMPANY
  };
}

export function destroyCompanySuccess(id) {
  message.success('Company successfully deleted');
  return {
    type: actionTypes.DELETE_COMPANY_SUCCESS,
    id
  };
}

export type DestroyCompanyFailureAction = {
  type: string
};
export function destroyCompanyFailure(): DestroyCompanyFailureAction {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_COMPANY_FAILURE
  };
}

export function destroyCompany(id) {
  return dispatch => {
    dispatch(destroyCompanyIsLoading());
    return API.companies
      .destroy(id)
      .then(() => {
        dispatch(destroyCompanySuccess(id));
      })
      .catch(() => {
        dispatch(destroyCompanyFailure());
      });
  };
}
