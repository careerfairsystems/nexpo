/*
*   This file contains methods to access the /student_sessions resource on the server.
*/

import { authPost, authDelete, handleHttpResponse, authPut } from './utils';

export default {
  /** Create a student session */
  create: data =>
    authPost('/api/student_sessions', data).then(handleHttpResponse),

  /** Updates a student session */
  update: (id, data) =>
    authPut(`/api/student_sessions/${id}`, data).then(handleHttpResponse),

  /** Delete a student session */
  destroy: id =>
    authDelete(`/api/student_sessions/${id}`).then(handleHttpResponse),

  /** Confirms a student session */
  confirmSession: id =>
    authPut(`/api/me/student_sessions/${id}`, {
      studentSession: { studentConfirmed: true }
    }).then(handleHttpResponse),

  /** Create a student session application */
  createAppl: data =>
    authPost('/api/student_session_applications', data).then(
      handleHttpResponse
    ),

  /** Update a student session application */
  updateAppl: (id, data) =>
    authPut(`/api/me/student_session_applications/${id}`, data).then(
      handleHttpResponse
    ),

  /** Delete a student session application */
  destroyAppl: id =>
    authDelete(`/api/me/student_session_applications/${id}`).then(
      handleHttpResponse
    )
};
