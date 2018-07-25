import { getJwt } from '../Util/JwtHelper';
import { handleHttpResponse } from './index';

export default {
  /**
   * Gets the current user
   */
  getMe: () =>
    fetch('/api/me', {
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getJwt()}`
      })
    }).then(handleHttpResponse)
};
