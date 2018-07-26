import { actionTypes } from '../..';
import API from '../../../API';
import { ApiError } from '../../../Errors/ApiError';

export function forgot_password_request() {
  return {
    type: actionTypes.FORGOT_PASSWORD_REQUEST
  };
}

export function forgot_password_success() {
  return {
    type: actionTypes.FORGOT_PASSWORD_SUCCESS
  };
}

export function forgot_password({ email }) {
  return dispatch => {
    dispatch(forgot_password_request());
    return API.session.forgot_password({ email }).then(res => {
      dispatch(forgot_password_success());
    });
  };
}

export function verify_forgot_password_key_request() {
  return {
    type: actionTypes.VERIFY_FORGOT_PASSWORD_KEY_REQUEST
  };
}

export function verify_forgot_password_key_success() {
  return {
    type: actionTypes.VERIFY_FORGOT_PASSWORD_KEY_SUCCESS
  };
}

export function verify_forgot_password_key_failure() {
  return {
    type: actionTypes.VERIFY_FORGOT_PASSWORD_KEY_FAILURE
  };
}

export function verify_forgot_password_key({ key }) {
  return dispatch => {
    dispatch(verify_forgot_password_key_request());
    return API.session
      .verify_forgot_password_key({ key })
      .then(res => {
        dispatch(verify_forgot_password_key_success());
      })
      .catch(err => {
        dispatch(verify_forgot_password_key_failure());
      });
  };
}

export function replace_forgotten_password_request() {
  return {
    type: actionTypes.REPLACE_FORGOTTEN_PASSWORD_REQUEST
  };
}

export function replace_forgotten_password_success() {
  return {
    type: actionTypes.REPLACE_FORGOTTEN_PASSWORD_SUCCESS
  };
}

export type ReplaceForgottenPasswordFailureAction = {
  type: string,
  errors: object
};
export function replace_forgotten_password_failure(
  errors
): ReplaceForgottenPasswordFailureAction {
  return {
    type: actionTypes.REPLACE_FORGOTTEN_PASSWORD_FAILURE,
    errors
  };
}

export function replace_forgotten_password({
  key,
  password,
  password_confirmation
}) {
  return dispatch => {
    dispatch(replace_forgotten_password_request());
    return API.session
      .replace_forgotten_password({
        key,
        password,
        password_confirmation
      })
      .then(res => {
        dispatch(replace_forgotten_password_success());
      })
      .catch((error: ApiError) => {
        dispatch(replace_forgotten_password_failure(error.errors));
      });
  };
}
