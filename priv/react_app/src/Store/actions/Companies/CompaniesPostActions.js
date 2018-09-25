import { actionTypes } from '../..';
import API from '../../../API';

export function createCompanyIsLoading() {
  return {
    type: actionTypes.POST_COMPANY
  };
}

export function createCompanySuccess(company) {
  return {
    type: actionTypes.POST_COMPANY_SUCCESS,
    company
  };
}

export type CreateCompanyFailureAction = {
  type: string
};
export function createCompanyFailure(): CreateCompanyFailureAction {
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
      })
      .catch(() => {
        dispatch(createCompanyFailure());
      });
  };
}
