import companies from './companies'
import signup from './signup'
import session from './session'
import users from './users'

export default {
  companies,
  signup,
  session,
  users
}

type ServerResponse = {
  type: string,
  error: string,
  errors: object
}
function ApiError(serverResponse: ServerResponse) {
  this.message = `The server responded with ${serverResponse.error}`
  this.name = 'ApiError'
  this.errors = serverResponse.errors
}

/**
 * Default handler for fetch calls
 * @param {Response} response
 */
export const handleHttpResponse = (response: Response) => {
  if(response.ok) {
    return response.json()
  }
  else {
    return response.json()
    .then(res => {
      throw new ApiError(res)
    })
  }
}
