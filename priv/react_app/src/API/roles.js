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
  create: () => authPost('/api/roles').then(handleHttpResponse),

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
  update: id => authPut(`/api/roles/${id}`).then(handleHttpResponse),

  /**
   * Delete a role
   */
  destroy: id => authDelete(`/api/roles/${id}`).then(handleHttpResponse)
};
