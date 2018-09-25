import { actionTypes } from '../..';
import API from '../../../API';

export function updateCategoryIsLoading() {
  return {
    type: actionTypes.PUT_CATEGORY
  };
}

export function updateCategorySuccess(category) {
  return {
    type: actionTypes.PUT_CATEGORY_SUCCESS,
    category
  };
}

export type UpdateCategoryFailureAction = {
  type: string
};
export function updateCategoryFailure(): UpdateCategoryFailureAction {
  return {
    type: actionTypes.PUT_CATEGORY_FAILURE
  };
}

export function updateCategory(id, data) {
  return dispatch => {
    dispatch(updateCategoryIsLoading());
    return API.categories
      .update(id, data)
      .then(category => {
        dispatch(updateCategorySuccess(category.data));
      })
      .catch(() => {
        dispatch(updateCategoryFailure());
      });
  };
}
