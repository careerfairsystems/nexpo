/*
*   This file contains methods to access the /student_sessions resource on the server.
*/

import { authPost, handleHttpResponse } from './utils';

export default {
  /**
   * Create a student session application
   */
  create: data =>
    authPost('/api/student_session_applications', data).then(handleHttpResponse)
};
