/*
*   This file contains methods to access the /student_sessions resource on the server.
*/

import {
  authPost,
  authPatch,
  authDelete,
  authPut,
  download,
  handleHttpResponse
} from './utils';

export default {
  /** Create a student session */
  create: (data: {}) =>
    authPost('/api/student_sessions', data).then(handleHttpResponse),

  /** Creates multiple student sessions */
  createBulk: (data: {}) =>
    authPatch('/api/student_sessions/', data).then(handleHttpResponse),

  /** Updates a student session */
  update: (id: string, data: {}) =>
    authPut(`/api/student_sessions/${id}`, data).then(handleHttpResponse),

  /** Delete a student session */
  destroy: (id: string) =>
    authDelete(`/api/student_sessions/${id}`).then(handleHttpResponse),

  /** Confirms a student session */
  confirmSession: (id: string) =>
    authPut(`/api/me/student_sessions/${id}`, {
      studentSession: { studentConfirmed: true }
    }).then(handleHttpResponse),

  /** Fetches all reserves for student sessions */
  downloadReserves: () =>
    download('/api/student_session_reserves', 'reserves.csv'),

  /** Fetches company schema for student sessions */
  downloadSchema: () => download(/* TODO */ '', 'schema.csv'),

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
