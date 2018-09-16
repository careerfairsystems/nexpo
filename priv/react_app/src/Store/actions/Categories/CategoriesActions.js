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

export function getCategoryIsLoading() {
  return {
    type: actionTypes.FETCH_CATEGORY
  };
}

export function getCategorySuccess(category) {
  return {
    type: actionTypes.FETCH_CATEGORY_SUCCESS,
    category
  };
}

export type GetCategoryFailureAction = {
  type: string
};
export function getCategoryFailure(): GetCategoryFailureAction {
  return {
    type: actionTypes.FETCH_CATEGORY_FAILURE
  };
}

export function getCategory(id) {
  return dispatch => {
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
