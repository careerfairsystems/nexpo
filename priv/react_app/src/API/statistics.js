/*
*   This file contains methods to access the /companies resource on the server.
*/

import { authFetch, handleHttpResponse } from './utils';

export default {
  /**
   * Fetches all statistics
   */
  getAll: () => authFetch('/api/statistics').then(handleHttpResponse)
};
