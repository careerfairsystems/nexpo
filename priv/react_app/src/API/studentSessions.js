/*
*   This file contains methods to access the /student_sessions resource on the server.
*/

import { authPost, authDelete, handleHttpResponse, authPut } from './utils';

export default {
  /**
   * Create a student session application
   */
  create: data =>
    authPost('/api/student_session_applications', data).then(
      handleHttpResponse
    ),
  destroy: id =>
    authDelete(`/api/me/student_session_applications/${id}`).then(
      handleHttpResponse
    ),
  update: (id, data) =>
    authPut(`/api/me/student_session_applications/${id}`, data).then(
      handleHttpResponse
    )
};
