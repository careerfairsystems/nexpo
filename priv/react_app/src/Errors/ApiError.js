/**
 * Defines an error to be used when Api returns an error
 */
class ApiError extends Error {
  constructor(response, ...params) {
    super(...params)

    if(Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError)
    }

    this.name = 'ApiError'
    this.message = response.error
    this.errors = response.errors
  }
}

export default ApiError
