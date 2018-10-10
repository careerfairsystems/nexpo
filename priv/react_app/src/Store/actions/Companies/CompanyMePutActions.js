import { actionTypes } from '../..';
import API from '../../../API';

export const updateCurrentCompanyIsLoading = () => ({
  type: actionTypes.PUT_CURRENT_COMPANY
});

export const updateCurrentCompanySuccess = company => ({
  type: actionTypes.PUT_CURRENT_COMPANY_SUCCESS,
  company
});

export const updateCurrentCompanyFailure = () => ({
  type: actionTypes.PUT_CURRENT_COMPANY_FAILURE
});

export function updateCurrentCompany(data) {
  return dispatch => {
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
