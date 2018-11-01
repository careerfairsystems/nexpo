import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const updateProgrammeIsLoading = () => ({
  type: actionTypes.PUT_PROGRAMME
});

export const updateProgrammeSuccess = (programme: {}) => {
  message.success('Programme successfully updated');
  return {
    type: actionTypes.PUT_PROGRAMME_SUCCESS,
    programme
  };
};

export type UpdateProgrammeFailureAction = {
  type: string
};
export const updateProgrammeFailure = (): UpdateProgrammeFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.PUT_PROGRAMME_FAILURE
  };
};

export function updateProgramme(id: string, data: {}) {
  return (dispatch: Dispatch<{ type: string }>) => {
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
