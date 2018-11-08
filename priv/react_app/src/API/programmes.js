/*
*   This file contains methods to access the /programmes resource on the server.
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
   * Create a Programme
   */
  create: (data: {}) =>
    authPost('/api/programmes', data).then(handleHttpResponse),

  /**
   * Fetches all programmes
   */
  getAll: () => authFetch('/api/programmes').then(handleHttpResponse),

  /**
   * Fetches a Programme
   */
  get: (id: string) =>
    authFetch(`/api/programmes/${id}`).then(handleHttpResponse),

  /**
   * Updates a Programme
   */
  update: (id: string, data: {}) =>
    authPut(`/api/programmes/${id}`, data).then(handleHttpResponse),

  /**
   * Delete a Programme
   */
  delete: (id: string) =>
    authDelete(`/api/programmes/${id}`).then(handleHttpResponse)
};
