/*
*   This file contains methods to access the /mailtemplates resource on the server.
*/

import {
  authPost,
  authFetch,
  authPut,
  authDelete,
  handleHttpResponse
} from './utils';

export default {
  /**
   * Create a mail template
   */
  create: data => authPost('/api/mailtemplates', data).then(handleHttpResponse),

  /**
   * Fetches all mailtemplates
   */
  getAll: () => authFetch('/api/mailtemplates').then(handleHttpResponse),

  /**
   * Fetches a mail template
   */
  get: id => authFetch(`/api/mailtemplates/${id}`).then(handleHttpResponse),

  /**
   * Updates a mail template
   */
  update: (id, data) =>
    authPut(`/api/mailtemplates/${id}`, data).then(handleHttpResponse),

  /**
   * Delete a mail template
   */
  destroy: id => authDelete(`/api/mailtemplates/${id}`).then(handleHttpResponse)
};
