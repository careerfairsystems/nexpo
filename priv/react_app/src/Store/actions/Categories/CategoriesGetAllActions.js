import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const getAllCategoriesIsLoading = () => ({
  type: actionTypes.FETCH_CATEGORIES
});

export const getAllCategoriesSuccess = (categories: Array<{}>) => ({
  type: actionTypes.FETCH_CATEGORIES_SUCCESS,
  categories
});

export type GetAllCategoriesFailureAction = {
  type: string
};
export const getAllCategoriesFailure = (): GetAllCategoriesFailureAction => {
  message.error(
    'Something went wrong when trying to fetch all categories, please try again later'
  );
  return {
    type: actionTypes.FETCH_CATEGORIES_FAILURE
  };
};

export function getAllCategories() {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(getAllCategoriesIsLoading());
    return API.categories
      .getAll()
      .then(categories => {
        dispatch(getAllCategoriesSuccess(categories.data));
      })
      .catch(() => {
        dispatch(getAllCategoriesFailure());
      });
  };
}
