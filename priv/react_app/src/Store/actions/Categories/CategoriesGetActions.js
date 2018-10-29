import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const getCategoryIsLoading = () => ({
  type: actionTypes.FETCH_CATEGORY
});

export const getCategorySuccess = (category: {}) => ({
  type: actionTypes.FETCH_CATEGORY_SUCCESS,
  category
});

export type GetCategoryFailureAction = {
  type: string
};
export const getCategoryFailure = (): GetCategoryFailureAction => {
  message.error(
    'Something went wrong when trying to fetch category, please try again later'
  );
  return {
    type: actionTypes.FETCH_CATEGORY_FAILURE
  };
};

export function getCategory(id: string) {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(getCategoryIsLoading());
    return API.categories
      .get(id)
      .then(category => {
        dispatch(getCategorySuccess(category.data));
      })
      .catch(() => {
        dispatch(getCategoryFailure());
      });
  };
}
