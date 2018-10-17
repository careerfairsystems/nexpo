import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function updateProgrammeIsLoading() {
  return {
    type: actionTypes.PUT_PROGRAMME
  };
}

export function updateProgrammeSuccess(programme) {
  message.success('Programme successfully updated');
  return {
    type: actionTypes.PUT_PROGRAMME_SUCCESS,
    programme
  };
}

export type UpdateProgrammeFailureAction = {
  type: string
};
export function updateProgrammeFailure(): UpdateProgrammeFailureAction {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.PUT_PROGRAMME_FAILURE
  };
}

export function updateProgramme(id, data) {
  return dispatch => {
    dispatch(updateProgrammeIsLoading());
    return API.programmes
      .update(id, data)
      .then(programme => {
        dispatch(updateProgrammeSuccess(programme.data));
      })
      .catch(() => {
        dispatch(updateProgrammeFailure());
      });
  };
}
