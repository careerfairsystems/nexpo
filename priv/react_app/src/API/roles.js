import { authFetch, handleHttpResponse } from './utils';

export default {
  /**
   * Fetches all roles
   */
  getAll: () => authFetch('/api/roles').then(handleHttpResponse),

  /**
   * Fetches a role
   */
  get: id => authFetch(`/api/roles/${id}`).then(handleHttpResponse)
};
