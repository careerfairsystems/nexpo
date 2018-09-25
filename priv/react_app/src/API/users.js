import { authFetch, authPutFormData, handleHttpResponse } from './utils';

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
   * Updates a user
   */
  put: (id, data) =>
    authPutFormData(`/api/students/${id}`, data).then(handleHttpResponse)
};
