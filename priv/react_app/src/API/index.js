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

/**
 * Default handler for fetch calls
 * @param {Response} response
 */
export const handleHttpFailure = (response: Response) => {
  if(!response.ok) {
    throw Error(response.statusText)
  }
  return response.json()
}
