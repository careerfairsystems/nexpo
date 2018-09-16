/*
*   This file contains methods to access the /categories reasource on the server.
*/

import { handleHttpResponse } from './index';

export default {
  /**
   * Fetches all categories
   */
  getAll: () => fetch('/api/categories').then(handleHttpResponse),

  /**
   * Fetches a category
   */
  get: id => fetch(`/api/categories/${id}`).then(handleHttpResponse)
};
