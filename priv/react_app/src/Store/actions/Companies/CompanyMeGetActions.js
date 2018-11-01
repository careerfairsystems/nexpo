import type { Dispatch } from 'redux';
import { actionTypes } from '../..';
import API from '../../../API';

export const getCurrentCompanyIsLoading = () => ({
  type: actionTypes.FETCH_CURRENT_COMPANY
});

export const getCurrentCompanySuccess = (company: {}) => ({
  type: actionTypes.FETCH_CURRENT_COMPANY_SUCCESS,
  company
});

export const getCurrentCompanyFailure = () => ({
  type: actionTypes.FETCH_CURRENT_COMPANY_FAILURE
});

export function getCurrentCompany() {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(getCurrentCompanyIsLoading());
    return API.companies
      .getMyCompany()
      .then(company => {
        dispatch(getCurrentCompanySuccess(company.data));
      })
      .catch(() => {
        dispatch(getCurrentCompanyFailure());
      });
  };
}
