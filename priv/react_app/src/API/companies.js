/*
*   This file contains methods to access the /companies reasource on the server.
*/

export default {

  /**
   * Fetches all companies
   */
  getAll: () => {
    return fetch('/api/companies')
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .catch((error) => {
      throw Error(error);
    })
  }
}
