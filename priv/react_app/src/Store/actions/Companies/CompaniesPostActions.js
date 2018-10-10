import { reset } from 'redux-form';
import { message } from 'antd';
import { actionTypes } from '../..';

import API from '../../../API';

export function createCompanyIsLoading() {
  return {
    type: actionTypes.POST_COMPANY
  };
}

export function createCompanySuccess(company) {
  message.success('Company successfully created');
  return {
    type: actionTypes.POST_COMPANY_SUCCESS,
    company
  };
}

export type CreateCompanyFailureAction = {
  type: string
};
export function createCompanyFailure(): CreateCompanyFailureAction {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.POST_COMPANY_FAILURE
  };
}

export function createCompany(data) {
  return dispatch => {
    dispatch(createCompanyIsLoading());
    return API.companies
      .create(data)
      .then(company => {
        dispatch(createCompanySuccess(company.data));
        dispatch(reset('company'));
      })
      .catch(() => {
        dispatch(createCompanyFailure());
      });
  };
}
