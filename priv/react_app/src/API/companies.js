/*
*   This file contains methods to access the /companies reasource on the server.
*/

import { authFetch, handleHttpResponse } from './utils';

export default {
  /**
   * Fetches all companies
   */
  getAll: () => authFetch('/api/companies').then(handleHttpResponse),

  /**
   * Fetches a company
   */
  get: id => authFetch(`/api/companies/${id}`).then(handleHttpResponse)
};
