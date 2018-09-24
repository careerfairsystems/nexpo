import { ApiError } from '../Errors/ApiError';
import { getJwt } from '../Util/JwtHelper';

type Response = {
  type: string,
  error: string,
  errors: object
};

/**
 * Default handler for fetch calls
 * @param {Response} response
 */
export const handleHttpResponse = (response: Response): Promise => {
  if (response.ok) {
    return response.json();
  }

  return response.json().then(res => {
    throw new ApiError(res);
  });
};

export const authFetch = url =>
  fetch(url, {
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getJwt()}`
    })
  });

export default {
  authFetch,
  handleHttpResponse
};
