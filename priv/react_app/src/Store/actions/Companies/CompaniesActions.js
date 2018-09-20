import { actionTypes } from '../..';
import API from '../../../API';

export function getAllCompaniesIsLoading() {
  return {
    type: actionTypes.FETCH_COMPANIES
  };
}

export function getAllCompaniesSuccess(companies) {
  return {
    type: actionTypes.FETCH_COMPANIES_SUCCESS,
    companies
  };
}

export type GetAllCompaniesFailureAction = {
  type: string
};
export function getAllCompaniesFailure(): GetAllCompaniesFailureAction {
  return {
    type: actionTypes.FETCH_COMPANIES_FAILURE
  };
}

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

export function getCompanyIsLoading() {
  return {
    type: actionTypes.FETCH_COMPANY
  };
}

export function getCompanySuccess(company) {
  return {
    type: actionTypes.FETCH_COMPANY_SUCCESS,
    company
  };
}
export function postCompanySuccess(company) {
  return {
    type: actionTypes.POST_COMPANY_SUCCESS,
    company
  };
}

export type GetCompanyFailureAction = {
  type: string
};
export function getCompanyFailure(): GetCompanyFailureAction {
  return {
    type: actionTypes.FETCH_COMPANY_FAILURE
  };
}

export function getCompany(id) {
  return dispatch => {
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

export function postCompanyIsLoading() {
  return {
    type: actionTypes.POST_COMPANY
  };
}

export function postCompanyFailure() {
  return {
    type: actionTypes.POST_COMPANY_FAILURE
  };
}

export function postCompany(company) {
  return dispatch => {
    dispatch(postCompanyIsLoading());
    API.companies
      .post(company)
      .then(c => {
        dispatch(postCompanySuccess(c.data));
      })
      .catch(() => {
        dispatch(postCompanyFailure());
      });
  };
}
