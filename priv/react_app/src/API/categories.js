/*
*   This file contains methods to access the /categories reasource on the server.
*/

import { authFetch, handleHttpResponse } from './utils';

export default {
  /**
   * Fetches all categories
   */
  getAll: () => authFetch('/api/categories').then(handleHttpResponse),

  /**
   * Fetches a category
   */
  get: id => authFetch(`/api/categories/${id}`).then(handleHttpResponse)
};
