import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const updateCompanyIsLoading = () => ({
  type: actionTypes.PUT_COMPANY
});

export const updateCompanySuccess = (company: {}) => {
  message.success('Company successfully updated');
  return {
    type: actionTypes.PUT_COMPANY_SUCCESS,
    company
  };
};

export type UpdateCompanyFailureAction = {
  type: string
};
export const updateCompanyFailure = (): UpdateCompanyFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.PUT_COMPANY_FAILURE
  };
};

export function updateCompany(id: string, data: {}) {
  return (dispatch: Dispatch<{ type: string }>) => {
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
