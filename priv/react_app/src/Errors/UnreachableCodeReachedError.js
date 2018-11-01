/**
 * Defines an error to be used when code that
 * should be unreachable, is reached
 */
class UnreachableCodeReachedError extends Error {
  constructor(...params: Array<any>) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnreachableCodeReachedError);
    }

    this.name = 'UnreachableCodeReachedError';
  }
}

export default UnreachableCodeReachedError;
