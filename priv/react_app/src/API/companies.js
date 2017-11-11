/*
*   This file contains methods to access the /companies reasource on the server.
*/

import {handleHttpResponse} from './index'

export default {

  /**
   * Fetches all companies
   */
  getAll: () => {
    return fetch('/api/companies')
    .then(handleHttpResponse)
  }
}
