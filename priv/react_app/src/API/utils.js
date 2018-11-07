import ApiError from '../Errors/ApiError';
import { getJwt } from '../Util/JwtHelper';
import { snakeCaseKeys, toFormData } from '../Util/FormatHelper';
import 'whatwg-fetch'; // fetch polyfill for unsupported browsers

export type Response = {
  ok: boolean,
  type: any,
  error?: string,
  errors?: Error,
  +json: () => Promise<*>,
  headers: Headers,
  +text: () => Promise<any>
};

type ErrorResponse = {
  error: string,
  errors: { password?: string, passwordConfirmation?: string }
};

/**
 * Default handler for fetch calls
 * @param {Response} response
 */
export const handleHttpResponse = (
  response: Response
): Promise<{ data: any }> => {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  if (response.ok && isJson) {
    return response.json();
  }
  if (response.ok) {
    return response.text();
  }
  if (isJson) {
    return response.json().then((res: ErrorResponse) => {
      throw new ApiError(res);
    });
  }
  return response.text().then((res: ErrorResponse) => {
    throw new ApiError(res);
  });
};

export const authPost = (url: string, data: {}): Promise<Response> =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(snakeCaseKeys(data)),
    headers: new Headers({
      Authorization: `Bearer ${getJwt()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })
  });

export const authFormPost = (url: string, data: {}): Promise<Response> =>
  fetch(url, {
    method: 'POST',
    body: toFormData(data),
    headers: new Headers({
      Authorization: `Bearer ${getJwt()}`,
      Accept: 'application/json'
    })
  });

export const authPatch = (url: string, data: {}): Promise<Response> =>
  fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(snakeCaseKeys(data)),
    headers: new Headers({
      Authorization: `Bearer ${getJwt()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })
  });

export const authFetch = (url: string): Promise<Response> =>
  fetch(url, {
    headers: new Headers({
      Authorization: `Bearer ${getJwt()}`,
      Accept: 'application/json'
    })
  });

export const authPut = (url: string, data: {}): Promise<Response> =>
  fetch(url, {
    method: 'PUT',
    body: JSON.stringify(snakeCaseKeys(data)),
    headers: new Headers({
      Authorization: `Bearer ${getJwt()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })
  });

export const authFormPut = (url: string, data: {}): Promise<Response> =>
  fetch(url, {
    method: 'PUT',
    body: toFormData(data),
    headers: new Headers({
      Authorization: `Bearer ${getJwt()}`,
      Accept: 'application/json'
    })
  });

export const authDelete = (url: string): Promise<Response> =>
  fetch(url, {
    method: 'DELETE',
    headers: new Headers({
      Authorization: `Bearer ${getJwt()}`
    })
  });

export const download = async (url: string, filename: string) => {
  const response = await fetch(url, {
    headers: new Headers({
      Authorization: `Bearer ${getJwt()}`
    })
  });
  const blob = await response.blob();
  const element = document.createElement('a');
  element.href = URL.createObjectURL(blob);
  element.download = filename;
  element.click();
};

export const fetchJson = (
  url: string,
  { data, method }: { data: {}, method: string }
): Promise<Response> =>
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
