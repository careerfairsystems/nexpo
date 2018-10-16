import { ApiError } from '../Errors/ApiError';
import { getJwt } from '../Util/JwtHelper';
import { snakeCaseKeys, toFormData } from '../Util/FormatHelper';

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
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  if (response.ok && isJson) {
    return response.json();
  }
  if (response.ok) {
    return response.text();
  }
  if (isJson) {
    return response.json().then(res => {
      throw new ApiError(res);
    });
  }
  return response.text().then(res => {
    throw new ApiError(res);
  });
};

export const authPost = (url, data) =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(snakeCaseKeys(data)),
    headers: new Headers({
      Authorization: `Bearer ${getJwt()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })
  });

export const authFormPost = (url, data) =>
  fetch(url, {
    method: 'POST',
    body: toFormData(data),
    headers: new Headers({
      Authorization: `Bearer ${getJwt()}`,
      Accept: 'application/json'
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
    body: JSON.stringify(snakeCaseKeys(data)),
    headers: new Headers({
      Authorization: `Bearer ${getJwt()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })
  });

export const authFormPut = (url, data) =>
  fetch(url, {
    method: 'PUT',
    body: toFormData(data),
    headers: new Headers({
      Authorization: `Bearer ${getJwt()}`,
      Accept: 'application/json'
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
  authFormPost,
  authFormPut,
  handleHttpResponse
};
