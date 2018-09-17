/*
*   This file contains methods to access the /companies reasource on the server.
*/

import { handleHttpResponse } from './index';

export default {
  /**
   * Fetches all companies
   */
  getAll: () => fetch('/api/companies').then(handleHttpResponse),

  /**
   * Fetches a company
   */
  get: id => fetch(`/api/companies/${id}`).then(handleHttpResponse)
};
