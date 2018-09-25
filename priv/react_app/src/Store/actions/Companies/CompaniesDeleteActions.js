import { actionTypes } from '../..';
import API from '../../../API';

export function destroyCompanyIsLoading() {
  return {
    type: actionTypes.DELETE_COMPANY
  };
}

export function destroyCompanySuccess(company) {
  return {
    type: actionTypes.DELETE_COMPANY_SUCCESS,
    company
  };
}

export type DestroyCompanyFailureAction = {
  type: string
};
export function destroyCompanyFailure(): DestroyCompanyFailureAction {
  return {
    type: actionTypes.DELETE_COMPANY_FAILURE
  };
}

export function destroyCompany(id) {
  return dispatch => {
    dispatch(destroyCompanyIsLoading());
    return API.companies
      .destroy(id)
      .then(company => {
        dispatch(destroyCompanySuccess(company.data));
      })
      .catch(() => {
        dispatch(destroyCompanyFailure());
      });
  };
}
