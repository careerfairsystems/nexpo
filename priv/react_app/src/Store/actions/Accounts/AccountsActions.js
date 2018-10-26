import { SubmissionError } from 'redux-form';
import { actionTypes } from '../..';
import API from '../../../API';
import ApiError from '../../../Errors/ApiError';

export function forgotPasswordRequest() {
  return {
    type: actionTypes.FORGOT_PASSWORD_REQUEST
  };
}

export function forgotPasswordSuccess() {
  return {
    type: actionTypes.FORGOT_PASSWORD_SUCCESS
  };
}

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

export function verifyForgotPasswordKeySuccess() {
  return {
    type: actionTypes.VERIFY_FORGOT_PASSWORD_KEY_SUCCESS
  };
}

export function verifyForgotPasswordKeyFailure() {
  return {
    type: actionTypes.VERIFY_FORGOT_PASSWORD_KEY_FAILURE
  };
}

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

export function replaceForgottenPasswordRequest() {
  return {
    type: actionTypes.REPLACE_FORGOTTEN_PASSWORD_REQUEST
  };
}

export function replaceForgottenPasswordSuccess() {
  return {
    type: actionTypes.REPLACE_FORGOTTEN_PASSWORD_SUCCESS
  };
}

export type ReplaceForgottenPasswordFailureAction = {
  type: string,
  errors: object
};
export function replaceForgottenPasswordFailure(
  errors
): ReplaceForgottenPasswordFailureAction {
  return {
    type: actionTypes.REPLACE_FORGOTTEN_PASSWORD_FAILURE,
    errors
  };
}

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
