import { SubmissionError } from 'redux-form';
import { actionTypes } from '../..';
import API from '../../../API';
import ApiError from '../../../Errors/ApiError';

export const forgotPasswordRequest = () => ({
  type: actionTypes.FORGOT_PASSWORD_REQUEST
});

export const forgotPasswordSuccess = () => ({
  type: actionTypes.FORGOT_PASSWORD_SUCCESS
});

export function forgotPassword({ email }) {
  return dispatch => {
    dispatch(forgotPasswordRequest());
    return API.session.forgotPassword({ email }).then(() => {
      dispatch(forgotPasswordSuccess());
    });
  };
}

export function verifyForgotPasswordKeyRequest() {
  return {
    type: actionTypes.VERIFY_FORGOT_PASSWORD_KEY_REQUEST
  };
}

export const verifyForgotPasswordKeySuccess = () => ({
  type: actionTypes.VERIFY_FORGOT_PASSWORD_KEY_SUCCESS
});

export const verifyForgotPasswordKeyFailure = () => ({
  type: actionTypes.VERIFY_FORGOT_PASSWORD_KEY_FAILURE
});

export function verifyForgotPasswordKey({ key }) {
  return dispatch => {
    dispatch(verifyForgotPasswordKeyRequest());
    return API.session
      .verifyForgotPasswordKey({ key })
      .then(() => {
        dispatch(verifyForgotPasswordKeySuccess());
      })
      .catch(() => {
        dispatch(verifyForgotPasswordKeyFailure());
      });
  };
}

export const replaceForgottenPasswordRequest = () => ({
  type: actionTypes.REPLACE_FORGOTTEN_PASSWORD_REQUEST
});

export const replaceForgottenPasswordSuccess = () => ({
  type: actionTypes.REPLACE_FORGOTTEN_PASSWORD_SUCCESS
});

export type ReplaceForgottenPasswordFailureAction = {
  type: string,
  errors: object
};
export const replaceForgottenPasswordFailure = (
  errors
): ReplaceForgottenPasswordFailureAction => ({
  type: actionTypes.REPLACE_FORGOTTEN_PASSWORD_FAILURE,
  errors
});

export function replaceForgottenPassword({
  key,
  password,
  passwordConfirmation
}) {
  return dispatch => {
    dispatch(replaceForgottenPasswordRequest());
    return API.session
      .replaceForgottenPassword({
        key,
        password,
        passwordConfirmation
      })
      .then(() => {
        dispatch(replaceForgottenPasswordSuccess());
      })
      .catch((error: ApiError) => {
        const { errors } = error;
        dispatch(replaceForgottenPasswordFailure(errors));
        if (errors)
          throw new SubmissionError({
            password: errors.password,
            passwordConfirmation: errors.passwordConfirmation
          });
      });
  };
}
