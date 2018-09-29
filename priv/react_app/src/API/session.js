import { handleHttpResponse } from './utils';
import UnreachableCodeReachedError from '../Errors/UnreachableCodeReachedError';

export default {
  /**
   * Tries to login
   */
  login: ({ email, password }) =>
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(handleHttpResponse),

  /**
   * Allows development login, only while not in production
   */
  development_login: ({ email }) => {
    if (process.env.NODE_ENV === 'production') {
      throw new UnreachableCodeReachedError(
        'Development login reached in production'
      );
    } else {
      return fetch('/api/development_login', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(handleHttpResponse);
    }
  },

  /**
   *
   */
  forgot_password: ({ email }) =>
    fetch('/api/password/forgot', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(handleHttpResponse),

  verify_forgot_password_key: ({ key }) =>
    fetch(`/api/password/forgot/${key}`).then(handleHttpResponse),

  replace_forgotten_password: ({ key, password, password_confirmation }) =>
    fetch(`/api/password/new/${key}`, {
      method: 'POST',
      body: JSON.stringify({ password, password_confirmation }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(handleHttpResponse)
};
