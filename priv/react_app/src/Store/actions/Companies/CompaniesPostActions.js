import type { Dispatch } from 'redux';
import { reset } from 'redux-form';
import { message } from 'antd';
import { actionTypes } from '../..';

import API from '../../../API';

export const createCompanyIsLoading = () => ({
  type: actionTypes.POST_COMPANY
});

export const createCompanySuccess = (company: {}) => {
  message.success('Company successfully created');
  return {
    type: actionTypes.POST_COMPANY_SUCCESS,
    company
  };
};

export type CreateCompanyFailureAction = {
  type: string
};
export const createCompanyFailure = (): CreateCompanyFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.POST_COMPANY_FAILURE
  };
};

export function createCompany(data: {}) {
  return (dispatch: Dispatch<{ type: string }>) => {
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

export const createCompanyBulkIsLoading = () => ({
  type: actionTypes.POST_COMPANY_BULK
});

export const createCompanyBulkSuccess = (company: {}) => {
  message.success('Company successfully created');
  return {
    type: actionTypes.POST_COMPANY_BULK_SUCCESS,
    company
  };
};

export type CreateCompanyBulkFailureAction = {
  type: string
};
export const createCompanyBulkFailure = (): CreateCompanyBulkFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.POST_COMPANY_BULK_FAILURE
  };
};

export function createBulk(data: {}) {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(createCompanyBulkIsLoading());
    return API.companies
      .createBulk(data)
      .then(companies => {
        companies.data.forEach(company => {
          dispatch(createCompanyBulkSuccess(company));
        });
      })
      .catch(() => {
        dispatch(createCompanyBulkFailure());
      });
  };
}
