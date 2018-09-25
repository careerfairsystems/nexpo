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

export const authPost = (url, data) =>
  fetch(url, {
    method: 'POST',
    body: data instanceof FormData ? data : JSON.stringify(data),
    headers: new Headers({
      Authorization: `Bearer ${getJwt()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })
  });

export const authFetch = url =>
  fetch(url, {
    headers: new Headers({
      Authorization: `Bearer ${getJwt()}`,
      Accept: 'application/json'
    })
  });

export const authPut = (url, data) =>
  fetch(url, {
    method: 'PUT',
    body: data instanceof FormData ? data : JSON.stringify(data),
    headers: new Headers({
      Authorization: `Bearer ${getJwt()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })
  });

export const authDelete = url =>
  fetch(url, {
    method: 'DELETE',
    headers: new Headers({
      Authorization: `Bearer ${getJwt()}`
    })
  });

export default {
  authPost,
  authFetch,
  authPut,
  authDelete,
  handleHttpResponse
};
