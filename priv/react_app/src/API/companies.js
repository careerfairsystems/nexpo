/*
 *   This file contains methods to access the /companies resource on the server.
 */

import {
  authPost,
  authFormPost,
  authFetch,
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
  updateMyCompany: (data: {}) =>
    authFormPut('/api/me/company', data).then(handleHttpResponse),

  /**
   * Removes the current company
   */
  deleteMyCompany: () => authDelete('/api/me/company').then(handleHttpResponse),

  /**
   * Create a company
   */
  create: (data: {}) =>
    authFormPost('/api/companies', data).then(handleHttpResponse),

  /**
   * Create multiple companies
   */
  createBulk: (data: {}) =>
    authPost('/api/companies/create_bulk', data).then(handleHttpResponse),

  /**
   * Fetches all companies
   */
  getAll: () => authFetch('/api/companies').then(handleHttpResponse),

  /**
   * Fetches a company
   */
  get: (id: string) =>
    authFetch(`/api/companies/${id}`).then(handleHttpResponse),

  /**
   * Updates a company
   */
  update: (id: string, data: {}) =>
    authFormPut(`/api/companies/${id}`, data).then(handleHttpResponse),

  /**
   * Delete a company
   */
  delete: (id: string) =>
    authDelete(`/api/companies/${id}`).then(handleHttpResponse)
};
