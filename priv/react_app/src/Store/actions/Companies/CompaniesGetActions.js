import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const getCompanyIsLoading = () => ({
  type: actionTypes.FETCH_COMPANY
});

export const getCompanySuccess = (company: {}) => ({
  type: actionTypes.FETCH_COMPANY_SUCCESS,
  company
});

export type GetCompanyFailureAction = {
  type: string
};
export const getCompanyFailure = (): GetCompanyFailureAction => {
  message.error(
    'Something went wrong when trying to fetch company, please try again later'
  );
  return {
    type: actionTypes.FETCH_COMPANY_FAILURE
  };
};

export function getCompany(id: string) {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(getCompanyIsLoading());
    return API.companies
      .get(id)
      .then(company => {
        dispatch(getCompanySuccess(company.data));
      })
      .catch(() => {
        dispatch(getCompanyFailure());
      });
  };
}
