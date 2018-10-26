/**
 * Defines an error to be used when Api returns an error
 */

type ErrorResponse = {
  error: string,
  errors: Error
};
class ApiError extends Error {
  constructor(response: ErrorResponse, ...params: Array<any>) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
    Object.defineProperty(this, 'errors', {
      value: response.errors,
      writable: false
    });
    this.name = 'ApiError';
    this.message = response.error;
  }
}
export default ApiError;
