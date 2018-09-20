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
  get: id => fetch(`/api/companies/${id}`).then(handleHttpResponse),

  /**
   * Posts a company
   */
  post: company =>
    fetch('/api/companies/', {
      method: 'POST',
      body: JSON.stringify(company),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(handleHttpResponse)
};
