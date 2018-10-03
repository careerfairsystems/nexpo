/*
*   This file contains methods to access the /roles resource on the server.
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
   * Create a role
   */
  create: data => authPost('/api/roles', data).then(handleHttpResponse),

  /**
   * Fetches all roles
   */
  getAll: () => authFetch('/api/roles').then(handleHttpResponse),

  /**
   * Fetches a role
   */
  get: id => authFetch(`/api/roles/${id}`).then(handleHttpResponse),

  /**
   * Updates a role
   */
  update: (id, data) =>
    authPut(`/api/roles/${id}`, data).then(handleHttpResponse),

  /**
   * Delete a role
   */
  destroy: id => authDelete(`/api/roles/${id}`).then(handleHttpResponse)
};
