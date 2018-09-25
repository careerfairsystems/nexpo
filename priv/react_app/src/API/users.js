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
  getMe: () => authPost('/api/me').then(handleHttpResponse),

  /**
   * Updates the current user
   */
  updateMe: data => authPut('/api/me', data).then(handleHttpResponse),

  /**
   * Delete the current user
   */
  destroyMe: () => authDelete('/api/me').then(handleHttpResponse),

  /**
   * Updates the current user's student
   */
  updateStudent: data =>
    authPut('/api/me/student', data).then(handleHttpResponse),

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
