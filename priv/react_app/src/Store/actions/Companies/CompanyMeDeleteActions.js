import { actionTypes } from '../..';
import API from '../../../API';

export const destroyCurrentCompanyIsLoading = () => ({
  type: actionTypes.DELETE_CURRENT_COMPANY
});

export const destroyCurrentCompanySuccess = () => ({
  type: actionTypes.DELETE_CURRENT_COMPANY_SUCCESS
});

export const destroyCurrentCompanyFailure = () => ({
  type: actionTypes.DELETE_CURRENT_COMPANY_FAILURE
});

export function destroyCurrentCompany() {
  return dispatch => {
    dispatch(destroyCurrentCompanyIsLoading());
    return API.companies
      .destroyMyCompany()
      .then(() => {
        dispatch(destroyCurrentCompanySuccess());
      })
      .catch(() => {
        dispatch(destroyCurrentCompanyFailure());
      });
  };
}
