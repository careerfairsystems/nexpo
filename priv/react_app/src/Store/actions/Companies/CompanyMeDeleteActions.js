import type { Dispatch } from 'redux';
import { actionTypes } from '../..';
import API from '../../../API';

export const deleteCurrentCompanyIsLoading = () => ({
  type: actionTypes.DELETE_CURRENT_COMPANY
});

export const deleteCurrentCompanySuccess = () => ({
  type: actionTypes.DELETE_CURRENT_COMPANY_SUCCESS
});

export const deleteCurrentCompanyFailure = () => ({
  type: actionTypes.DELETE_CURRENT_COMPANY_FAILURE
});

export function deleteCurrentCompany() {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(deleteCurrentCompanyIsLoading());
    return API.companies
      .deleteMyCompany()
      .then(() => {
        dispatch(deleteCurrentCompanySuccess());
      })
      .catch(() => {
        dispatch(deleteCurrentCompanyFailure());
      });
  };
}
