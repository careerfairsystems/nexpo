import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const destroyCompanyIsLoading = () => ({
  type: actionTypes.DELETE_COMPANY
});

export const destroyCompanySuccess = (id: string) => {
  message.success('Company successfully deleted');
  return {
    type: actionTypes.DELETE_COMPANY_SUCCESS,
    id
  };
};

export type DestroyCompanyFailureAction = {
  type: string
};
export const destroyCompanyFailure = (): DestroyCompanyFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_COMPANY_FAILURE
  };
};

export function destroyCompany(id: string) {
  return dispatch => {
    dispatch(destroyCompanyIsLoading());
    return API.companies
      .destroy(id)
      .then(() => {
        dispatch(destroyCompanySuccess(id));
      })
      .catch(() => {
        dispatch(destroyCompanyFailure());
      });
  };
}
