import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const deleteCompanyIsLoading = () => ({
  type: actionTypes.DELETE_COMPANY
});

export const deleteCompanySuccess = (id: string) => {
  message.success('Company successfully deleted');
  return {
    type: actionTypes.DELETE_COMPANY_SUCCESS,
    id
  };
};

export type DestroyCompanyFailureAction = {
  type: string
};
export const deleteCompanyFailure = (): DestroyCompanyFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_COMPANY_FAILURE
  };
};

export function deleteCompany(id: string) {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(deleteCompanyIsLoading());
    return API.companies
      .delete(id)
      .then(() => {
        dispatch(deleteCompanySuccess(id));
      })
      .catch(() => {
        dispatch(deleteCompanyFailure());
      });
  };
}
