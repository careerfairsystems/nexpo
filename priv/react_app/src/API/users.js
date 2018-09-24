import { authFetch, handleHttpResponse } from './utils';

export default {
  /**
   * Gets the current user
   */
  getMe: () => authFetch('/api/me').then(handleHttpResponse)
};
