import { ApiError } from '../Errors/ApiError';
import { getJwt } from '../Util/JwtHelper';
import { snakeCaseKeys, toFormData } from '../Util/FormatHelper';
import 'whatwg-fetch'; // fetch polyfill for unsupported browsers

// type Response = {
//   ok: boolean,
//   type?: string,
//   error?: string,
//   errors?: Error,
//   +json: () => Promise<any>,
//   headers: Headers,
//   +text: () => Promise<any>
// };

/**
 * Default handler for fetch calls
 * @param {Response} response
 */
export const handleHttpResponse = (response: Response): Promise<any> => {
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

export const authPost = (url: string, data: {}): Promise<any> =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(snakeCaseKeys(data)),
    headers: new Headers({
      Authorization: `Bearer ${getJwt()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })
  });

export const authFormPost = (url: string, data: {}): Promise<any> =>
  fetch(url, {
    method: 'POST',
    body: toFormData(data),
    headers: new Headers({
      Authorization: `Bearer ${getJwt()}`,
      Accept: 'application/json'
    })
  });

export const authFetch = (url: string): Promise<any> =>
  fetch(url, {
    headers: new Headers({
      Authorization: `Bearer ${getJwt()}`,
      Accept: 'application/json'
    })
  });

export const authPut = (url: string, data: {}): Promise<any> =>
  fetch(url, {
    method: 'PUT',
    body: JSON.stringify(snakeCaseKeys(data)),
    headers: new Headers({
      Authorization: `Bearer ${getJwt()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })
  });

export const authFormPut = (url: string, data: {}): Promise<any> =>
  fetch(url, {
    method: 'PUT',
    body: toFormData(data),
    headers: new Headers({
      Authorization: `Bearer ${getJwt()}`,
      Accept: 'application/json'
    })
  });

export const authDelete = (url: string): Promise<any> =>
  fetch(url, {
    method: 'DELETE',
    headers: new Headers({
      Authorization: `Bearer ${getJwt()}`
    })
  });

export const fetchJson = (
  url: string,
  { data, method }: { data: {}, method: string }
): Promise<any> =>
  fetch(url, {
    method,
    body: JSON.stringify(snakeCaseKeys(data)),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  });

export default {
  authPost,
  authFetch,
  authPut,
  authDelete,
  authFormPost,
  authFormPut,
  fetchJson,
  handleHttpResponse
};
