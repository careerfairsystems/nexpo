import {
  authFetch,
  authPut,
  authPutFormData,
  handleHttpResponse
} from './utils';

export default {
  /**
   * Gets the current user
   */
  getMe: () => authFetch('/api/me').then(handleHttpResponse),

  /**
   * Fetches all users
   */
  getAll: () => authFetch('/api/users').then(handleHttpResponse),

  /**
   * Fetches a user
   */
  get: id => authFetch(`/api/users/${id}`).then(handleHttpResponse),
  /**
   * Updates current user
   */
  putMe: data => authPut('/api/me', data).then(handleHttpResponse),

  put1: (id, data) =>
    authPutFormData(`/api/users/${id}`, data).then(handleHttpResponse)
};
