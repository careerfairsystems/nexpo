import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function destroyCategoryIsLoading() {
  return {
    type: actionTypes.DELETE_CATEGORY
  };
}

export function destroyCategorySuccess(id) {
  message.success('Category successfully deleted');
  return {
    type: actionTypes.DELETE_CATEGORY_SUCCESS,
    id
  };
}

export type DestroyCategoryFailureAction = {
  type: string
};
export function destroyCategoryFailure(): DestroyCategoryFailureAction {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_CATEGORY_FAILURE
  };
}

export function destroyCategory(id) {
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
