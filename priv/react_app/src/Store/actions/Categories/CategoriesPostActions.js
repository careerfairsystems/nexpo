import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function createCategoryIsLoading() {
  return {
    type: actionTypes.POST_CATEGORY
  };
}

export function createCategorySuccess(category) {
  message.success('Category successfully created');
  return {
    type: actionTypes.POST_CATEGORY_SUCCESS,
    category
  };
}

export type CreateCategoryFailureAction = {
  type: string
};
export function createCategoryFailure(): CreateCategoryFailureAction {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.POST_CATEGORY_FAILURE
  };
}

export function createCategory(data) {
  return dispatch => {
    dispatch(createCategoryIsLoading());
    return API.categories
      .create(data)
      .then(category => {
        dispatch(createCategorySuccess(category.data));
      })
      .catch(() => {
        dispatch(createCategoryFailure());
      });
  };
}
