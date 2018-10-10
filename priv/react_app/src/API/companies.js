/*
*   This file contains methods to access the /companies resource on the server.
*/

import {
  authFormPost,
  authFetch,
  authPut,
  authFormPut,
  authDelete,
  handleHttpResponse
} from './utils';

export default {
  /**
  * Fetches the current company
  */
  getMyCompany: () => authFetch('/api/me/company').then(handleHttpResponse),

  /**
  * Updates the current company
  */
  updateMyCompany: data => authPut('/api/me/company', data).then(handleHttpResponse),

  /**
   * Create a company
   */
  create: data => authFormPost('/api/companies', data).then(handleHttpResponse),

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
    authFormPut(`/api/companies/${id}`, data).then(handleHttpResponse),

  /**
   * Delete a company
   */
  destroy: id => authDelete(`/api/companies/${id}`).then(handleHttpResponse)
};
