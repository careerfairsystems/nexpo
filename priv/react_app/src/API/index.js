import companies from './companies'
import signup from './signup'
import session from './session'
import users from './users'
import { ApiError } from '../Errors/ApiError';

export default {
  companies,
  signup,
  session,
  users
}

type Response = {
  type: string,
  error: string,
  errors: object
}

/**
 * Default handler for fetch calls
 * @param {Response} response
 */
export const handleHttpResponse = (response: Response): Promise => {
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
