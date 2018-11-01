import { fetchJson, handleHttpResponse } from './utils';
import UnreachableCodeReachedError from '../Errors/UnreachableCodeReachedError';
import 'whatwg-fetch'; // fetch polyfill for unsupported browsers

export default {
  /**
   * Tries to login
   */
  login: ({ email, password }: { email: string, password: string }) =>
    fetchJson('/api/login', { data: { email, password }, method: 'POST' }).then(
      handleHttpResponse
    ),

  /**
   * Allows development login, only while not in production
   */
  developmentLogin: ({ email }: { email: string }) => {
    if (process.env.NODE_ENV === 'production') {
      throw new UnreachableCodeReachedError(
        'Development login reached in production'
      );
    } else {
      return fetchJson('/api/development_login', {
        data: { email },
        method: 'POST'
      }).then(handleHttpResponse);
    }
  },

  /**
   *
   */
  forgotPassword: ({ email }: { email: string }) =>
    fetchJson('/api/password/forgot', { data: { email }, method: 'POST' }).then(
      handleHttpResponse
    ),

  verifyForgotPasswordKey: ({ key }: { key: string }): Promise<*> =>
    fetch(`/api/password/forgot/${key}`).then(handleHttpResponse),

  replaceForgottenPassword: ({
    key,
    password,
    passwordConfirmation
  }: {
    key: string,
    password: string,
    passwordConfirmation: string
  }) =>
    fetchJson(`/api/password/new/${key}`, {
      data: { password, passwordConfirmation },
      method: 'POST'
    }).then(handleHttpResponse)
};
