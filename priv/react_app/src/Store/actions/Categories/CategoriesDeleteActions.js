import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const deleteCategoryIsLoading = () => ({
  type: actionTypes.DELETE_CATEGORY
});

export const deleteCategorySuccess = (id: string) => {
  message.success('Category successfully deleted');
  return {
    type: actionTypes.DELETE_CATEGORY_SUCCESS,
    id
  };
};

export type DestroyCategoryFailureAction = {
  type: string
};
export const deleteCategoryFailure = (): DestroyCategoryFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_CATEGORY_FAILURE
  };
};

export function deleteCategory(id: string) {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(deleteCategoryIsLoading());
    return API.categories
      .delete(id)
      .then(() => {
        dispatch(deleteCategorySuccess(id));
      })
      .catch(() => {
        dispatch(deleteCategoryFailure());
      });
  };
}
