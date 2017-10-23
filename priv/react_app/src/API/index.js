import companies from './companies'
import signup from './signup'
import session from './session'

export default {
  companies,
  signup,
  session
}

/**
 * Holds the JWT of the currently signed in user
 */
let JWT = undefined

/**
 * Sets the current JWT
 */
export const setJwt = (jwt: string) => JWT = jwt

/**
 * Gets the current JWT
 */
export const getJwt = () => JWT
