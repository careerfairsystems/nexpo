import { actionTypes } from '../..';
import API from '../../../API';

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
