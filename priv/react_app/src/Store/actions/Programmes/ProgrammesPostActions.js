import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const createProgrammeIsLoading = () => ({
  type: actionTypes.POST_PROGRAMME
});

export const createProgrammeSuccess = (programme: {}) => {
  message.success('Programme successfully created');
  return {
    type: actionTypes.POST_PROGRAMME_SUCCESS,
    programme
  };
};

export type CreateProgrammeFailureAction = {
  type: string
};
export const createProgrammeFailure = (): CreateProgrammeFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.POST_PROGRAMME_FAILURE
  };
};

export function createProgramme(data: {}) {
  return (dispatch: Dispatch<{ type: string }>) => {
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
