/**
 * Defines an error to be used when Api returns an error
 */

type ErrorResponse = {
  error: string,
  errors: { password?: string, passwordConfirmation?: string }
};
class ApiError extends Error {
  errors: { password?: string, passwordConfirmation?: string };

  constructor(response: ErrorResponse, ...params: Array<any>) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
    this.name = 'ApiError';
    this.message = response.error;
    this.errors = response.errors;
  }
}
export default ApiError;
