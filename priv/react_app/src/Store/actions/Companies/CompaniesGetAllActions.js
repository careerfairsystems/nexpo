import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const getAllCompaniesIsLoading = () => ({
  type: actionTypes.FETCH_COMPANIES
});

export const getAllCompaniesSuccess = (companies: {}) => ({
  type: actionTypes.FETCH_COMPANIES_SUCCESS,
  companies
});

export type GetAllCompaniesFailureAction = {
  type: string
};
export const getAllCompaniesFailure = (): GetAllCompaniesFailureAction => {
  message.error(
    'Something went wrong when trying to fetch all companies, please try again later'
  );
  return {
    type: actionTypes.FETCH_COMPANIES_FAILURE
  };
};

export function getAllCompanies() {
  return dispatch => {
    dispatch(getAllCompaniesIsLoading());
    return API.companies
      .getAll()
      .then(companies => {
        dispatch(getAllCompaniesSuccess(companies.data));
      })
      .catch(() => {
        dispatch(getAllCompaniesFailure());
      });
  };
}
