import { actionTypes } from '../..';
import API from '../../../API';

export const destroyCurrentCompanyIsLoading = () => ({
  type: actionTypes.DELETE_CURRENT_COMPANY
});

export const destroyCurrentCompanySuccess = id => ({
  type: actionTypes.DELETE_CURRENT_COMPANY_SUCCESS,
  id
});

export const destroyCurrentCompanyFailure = () => ({
  type: actionTypes.DELETE_CURRENT_COMPANY_FAILURE
});

export function destroyCurrentCompany(id) {
  return dispatch => {
    dispatch(destroyCurrentCompanyIsLoading());
    return API.companies
      .destroyMe(id)
      .then(() => {
        dispatch(destroyCurrentCompanySuccess(id));
      })
      .catch(() => {
        dispatch(destroyCurrentCompanyFailure());
      });
  };
}
