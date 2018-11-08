/*
*   This file contains methods to access the /categories resource on the server.
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
   * Create a category
   */
  create: (data: {}) =>
    authPost('/api/categories', data).then(handleHttpResponse),

  /**
   * Fetches all categories
   */
  getAll: () => authFetch('/api/categories').then(handleHttpResponse),

  /**
   * Fetches a category
   */
  get: (id: string) =>
    authFetch(`/api/categories/${id}`).then(handleHttpResponse),

  /**
   * Updates a category
   */
  update: (id: string, data: {}) =>
    authPut(`/api/categories/${id}`, data).then(handleHttpResponse),

  /**
   * Delete a category
   */
  delete: (id: string) =>
    authDelete(`/api/categories/${id}`).then(handleHttpResponse)
};
