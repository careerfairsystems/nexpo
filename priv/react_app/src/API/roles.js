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
  create: (data: {}) => authPost('/api/roles', data).then(handleHttpResponse),

  /**
   * Fetches all roles
   */
  getAll: () => authFetch('/api/roles').then(handleHttpResponse),

  /**
   * Fetches a role
   */
  get: (id: string) => authFetch(`/api/roles/${id}`).then(handleHttpResponse),

  /**
   * Updates a role
   */
  update: (id: string, data: {}) =>
    authPut(`/api/roles/${id}`, data).then(handleHttpResponse),

  /**
   * Delete a role
   */
  delete: (id: string) =>
    authDelete(`/api/roles/${id}`).then(handleHttpResponse)
};
