import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export function createProgrammeIsLoading() {
  return {
    type: actionTypes.POST_PROGRAMME
  };
}

export function createProgrammeSuccess(programme) {
  message.success('Programme successfully created');
  return {
    type: actionTypes.POST_PROGRAMME_SUCCESS,
    programme
  };
}

export type CreateProgrammeFailureAction = {
  type: string
};
export function createProgrammeFailure(): CreateProgrammeFailureAction {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.POST_PROGRAMME_FAILURE
  };
}

export function createProgramme(data) {
  return dispatch => {
    dispatch(createProgrammeIsLoading());
    return API.programmes
      .create(data)
      .then(programme => {
        dispatch(createProgrammeSuccess(programme.data));
      })
      .catch(() => {
        dispatch(createProgrammeFailure());
      });
  };
}
