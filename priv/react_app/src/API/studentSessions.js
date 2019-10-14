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
  createBulk: () =>
    authPatch('/api/student_sessions/', {}).then(handleHttpResponse),

  /** Updates a student session */
  update: (id: string, data: {}) =>
    authPut(`/api/student_sessions/${id}`, data).then(handleHttpResponse),

  /** Delete a student session */
  delete: (id: string) =>
    authDelete(`/api/student_sessions/${id}`).then(handleHttpResponse),

  /** Deletes all student session that is not student confirmed */
  deleteNonConfirmed: () =>
    authDelete('/api/student_sessions').then(handleHttpResponse),

  /** Confirms a student session */
  confirmSession: (id: string) =>
    authPut(`/api/me/student_sessions/${id}`, {
      studentSession: { studentSessionStatus: 1 }
    }).then(handleHttpResponse),

  /** Decline a student session */
  declineSession: (id: string) =>
    authPut(`/api/me/student_sessions/${id}`, {
      studentSession: { studentSessionStatus: 2 }
    }).then(handleHttpResponse),

  /** Fetches all reserves for student sessions */
  downloadReserves: () =>
    download('/api/student_session_reserves', 'reserves.csv'),

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
  deleteAppl: (id: string) =>
    authDelete(`/api/me/student_session_applications/${id}`).then(
      handleHttpResponse
    )
};
