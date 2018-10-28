import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const destroyCategoryIsLoading = () => ({
  type: actionTypes.DELETE_CATEGORY
});

export const destroyCategorySuccess = (id: string) => {
  message.success('Category successfully deleted');
  return {
    type: actionTypes.DELETE_CATEGORY_SUCCESS,
    id
  };
};

export type DestroyCategoryFailureAction = {
  type: string
};
export const destroyCategoryFailure = (): DestroyCategoryFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_CATEGORY_FAILURE
  };
};

export function destroyCategory(id: string) {
  return dispatch => {
    dispatch(destroyCategoryIsLoading());
    return API.categories
      .destroy(id)
      .then(() => {
        dispatch(destroyCategorySuccess(id));
      })
      .catch(() => {
        dispatch(destroyCategoryFailure());
      });
  };
}
