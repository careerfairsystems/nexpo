import { ApiError } from '../Errors/ApiError';
import { getJwt } from '../Util/JwtHelper';
import { snakeCaseKeys, snakeCaseForm } from '../Util/FormatHelper';

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

const contentType = data =>
  data instanceof FormData ? {} : { 'Content-Type': 'application/json' };

const snakeCase = data => {
  if (data instanceof FormData) {
    return snakeCaseForm(data);
  }
  return JSON.stringify(snakeCaseKeys(data));
};

export const authPost = (url, data) =>
  fetch(url, {
    method: 'POST',
    body: snakeCase(data),
    headers: new Headers({
      Authorization: `Bearer ${getJwt()}`,
      Accept: 'application/json',
      ...contentType(data)
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
    body: snakeCase(data),
    headers: new Headers({
      Authorization: `Bearer ${getJwt()}`,
      Accept: 'application/json',
      ...contentType(data)
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
