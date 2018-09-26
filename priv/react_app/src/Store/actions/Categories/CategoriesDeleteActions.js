import { actionTypes } from '../..';
import API from '../../../API';

export function destroyCategoryIsLoading() {
  return {
    type: actionTypes.DELETE_CATEGORY
  };
}

export function destroyCategorySuccess(category) {
  return {
    type: actionTypes.DELETE_CATEGORY_SUCCESS,
    category
  };
}

export type DestroyCategoryFailureAction = {
  type: string
};
export function destroyCategoryFailure(): DestroyCategoryFailureAction {
  return {
    type: actionTypes.DELETE_CATEGORY_FAILURE
  };
}

export function destroyCategory(id) {
  return dispatch => {
    dispatch(destroyCategoryIsLoading());
    return API.categories
      .destroy(id)
      .then(category => {
        dispatch(destroyCategorySuccess(category.data));
      })
      .catch(() => {
        dispatch(destroyCategoryFailure());
      });
  };
}
