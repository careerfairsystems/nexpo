import type { Dispatch } from 'redux';
import { message } from 'antd';

import { actionTypes } from '../..';
import API from '../../../API';

export const updateCurrentCompanyIsLoading = () => ({
  type: actionTypes.PUT_CURRENT_COMPANY
});

export const updateCurrentCompanySuccess = (company: {}) => {
  message.success('Your company was successfully updated');
  return {
    type: actionTypes.PUT_CURRENT_COMPANY_SUCCESS,
    company
  };
};

export const updateCurrentCompanyFailure = () => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.PUT_CURRENT_COMPANY_FAILURE
  };
};

export function updateCurrentCompany(data: {}) {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(updateCurrentCompanyIsLoading());
    return API.companies
      .updateMyCompany(data)
      .then(company => {
        dispatch(updateCurrentCompanySuccess(company.data));
      })
      .catch(() => {
        dispatch(updateCurrentCompanyFailure());
      });
  };
}
