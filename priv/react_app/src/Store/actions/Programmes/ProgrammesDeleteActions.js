import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const destroyProgrammeIsLoading = () => {
  return {
    type: actionTypes.DELETE_PROGRAMME
  };
}

export const destroyProgrammeSuccess = (id: string) => {
  message.success('Programme successfully deleted');
  return {
    type: actionTypes.DELETE_PROGRAMME_SUCCESS,
    id
  };
}

export type DestroyProgrammeFailureAction = {
  type: string
};
export const destroyProgrammeFailure = (): DestroyProgrammeFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_PROGRAMME_FAILURE
  };
}

export function destroyProgramme(id: string) {
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
