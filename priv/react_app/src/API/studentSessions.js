/*
*   This file contains methods to access the /student_sessions resource on the server.
*/

import { authPost, authDelete, handleHttpResponse, authPut } from './utils';

export default {
  /**
   * Create a student session application
   */
  create: (data: {}) =>
    authPost('/api/student_session_applications', data).then(
      handleHttpResponse
    ),
  destroy: (id: string) =>
    authDelete(`/api/me/student_session_applications/${id}`).then(
      handleHttpResponse
    ),
  update: (id: string, data: {}) =>
    authPut(`/api/me/student_session_applications/${id}`, data).then(
      handleHttpResponse
    ),
  confirmSession: (id: string) =>
    authPut(`/api/me/student_sessions/${id}`, {
      studentSession: { studentConfirmed: true }
    }).then(handleHttpResponse),
  /** Create a student session application */
  createAppl: (data: {}) =>
    authPost('/api/student_session_applications', data).then(
      handleHttpResponse
    ),

  /** Update a student session application */
  updateAppl: (id: string, data: {}) =>
    authPut(`/api/me/student_session_applications/${id}`, data).then(
      handleHttpResponse
    ),

  /** Delete a student session application */
  destroyAppl: (id: string) =>
    authDelete(`/api/me/student_session_applications/${id}`).then(
      handleHttpResponse
    )
};
