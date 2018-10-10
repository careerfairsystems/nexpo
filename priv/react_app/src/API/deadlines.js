/*
*   This file contains methods to access the /deadlines resource on the server.
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
   * Create a deadline
   */
  create: data => authPost('/api/deadlines', data).then(handleHttpResponse),

  /**
   * Fetches all deadlines
   */
  getAll: () => authFetch('/api/deadlines').then(handleHttpResponse),

  /**
   * Fetches a deadline
   */
  get: id => authFetch(`/api/deadlines/${id}`).then(handleHttpResponse),

  /**
   * Updates a deadline
   */
  update: (id, data) =>
    authPut(`/api/deadlines/${id}`, data).then(handleHttpResponse),

  /**
   * Delete a deadline
   */
  destroy: id => authDelete(`/api/deadlines/${id}`).then(handleHttpResponse)
};
