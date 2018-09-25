import { actionTypes } from '../..';
import API from '../../../API';

export function updateCompanyIsLoading() {
  return {
    type: actionTypes.PUT_COMPANY
  };
}

export function updateCompanySuccess(company) {
  return {
    type: actionTypes.PUT_COMPANY_SUCCESS,
    company
  };
}

export type UpdateCompanyFailureAction = {
  type: string
};
export function updateCompanyFailure(): UpdateCompanyFailureAction {
  return {
    type: actionTypes.PUT_COMPANY_FAILURE
  };
}

export function updateCompany(id, data) {
  return dispatch => {
    dispatch(updateCompanyIsLoading());
    return API.companies
      .update(id, data)
      .then(company => {
        dispatch(updateCompanySuccess(company.data));
      })
      .catch(() => {
        dispatch(updateCompanyFailure());
      });
  };
}
