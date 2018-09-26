/*
*   This file contains methods to access the /companies resource on the server.
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
   * Create a company
   */
  create: data => authPost('/api/companies', data).then(handleHttpResponse),

  /**
   * Fetches all companies
   */
  getAll: () => authFetch('/api/companies').then(handleHttpResponse),

  /**
   * Fetches a company
   */
  get: id => authFetch(`/api/companies/${id}`).then(handleHttpResponse),

  /**
   * Updates a company
   */
  update: (id, data) =>
    authPut(`/api/companies/${id}`, data).then(handleHttpResponse),

  /**
   * Delete a company
   */
  destroy: id => authDelete(`/api/companies/${id}`).then(handleHttpResponse)
};
