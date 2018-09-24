import { authFetch, handleHttpResponse } from './utils';

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
  get: id => authFetch(`/api/users/${id}`).then(handleHttpResponse)
};
