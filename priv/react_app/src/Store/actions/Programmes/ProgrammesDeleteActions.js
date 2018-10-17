import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function destroyProgrammeIsLoading() {
  return {
    type: actionTypes.DELETE_PROGRAMME
  };
}

export function destroyProgrammeSuccess(id) {
  message.success('Programme successfully deleted');
  return {
    type: actionTypes.DELETE_PROGRAMME_SUCCESS,
    id
  };
}

export type DestroyProgrammeFailureAction = {
  type: string
};
export function destroyProgrammeFailure(): DestroyProgrammeFailureAction {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_PROGRAMME_FAILURE
  };
}

export function destroyProgramme(id) {
  return dispatch => {
    dispatch(destroyProgrammeIsLoading());
    return API.programmes
      .destroy(id)
      .then(() => {
        dispatch(destroyProgrammeSuccess(id));
      })
      .catch(() => {
        dispatch(destroyProgrammeFailure());
      });
  };
}
