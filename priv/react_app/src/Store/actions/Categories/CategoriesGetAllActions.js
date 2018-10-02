import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function getAllCategoriesIsLoading() {
  return {
    type: actionTypes.FETCH_CATEGORIES
  };
}

export function getAllCategoriesSuccess(categories) {
  return {
    type: actionTypes.FETCH_CATEGORIES_SUCCESS,
    categories
  };
}

export type GetAllCategoriesFailureAction = {
  type: string
};
export function getAllCategoriesFailure(): GetAllCategoriesFailureAction {
  message.error(
    'Something went wrong when trying to fetch all categories, please try again later'
  );
  return {
    type: actionTypes.FETCH_CATEGORIES_FAILURE
  };
}

export function getAllCategories() {
  return dispatch => {
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
