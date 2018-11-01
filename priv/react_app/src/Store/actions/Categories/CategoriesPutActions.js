import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const updateCategoryIsLoading = () => ({
  type: actionTypes.PUT_CATEGORY
});

export const updateCategorySuccess = (category: {}) => {
  message.success('Category successfully updated');
  return {
    type: actionTypes.PUT_CATEGORY_SUCCESS,
    category
  };
};

export type UpdateCategoryFailureAction = {
  type: string
};
export const updateCategoryFailure = (): UpdateCategoryFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.PUT_CATEGORY_FAILURE
  };
};

export function updateCategory(id: string, data: {}) {
  return (dispatch: Dispatch<{ type: string }>) => {
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
