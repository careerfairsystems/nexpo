/*
*   This file contains methods to access the /users resource on the server.
*/

import {
  authPost,
  authFetch,
  authPut,
  authDelete,
  handleHttpResponse
} from './utils';

export default {
  /**
   * Fetches the current user
   */
  getMe: () => authPost('/api/users').then(handleHttpResponse),

  /**
   * Create a user
   */
  create: () => authPost('/api/users').then(handleHttpResponse),

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
  update: id => authPut(`/api/users/${id}`).then(handleHttpResponse),

  /**
   * Delete a user
   */
  destroy: id => authDelete(`/api/users/${id}`).then(handleHttpResponse)
};
