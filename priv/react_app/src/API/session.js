import {handleHttpResponse} from './index'
import UnreachableCodeReachedError from './../Errors/UnreachableCodeReachedError'
import ApiError from './../Errors/ApiError'
export default {

  /**
   * Tries to login
   */
  login: ({email, password}) => {
    return fetch(`/api/login`, {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(handleHttpResponse)
  },

  /**
   * Allows development login, only while not in production
   */
  development_login: ({email}) => {
    if(process.env.NODE_ENV === 'production') {
      throw new UnreachableCodeReachedError('Development login reached in production')
    }
    else {
      return fetch(`/api/development_login`, {
        method: 'POST',
        body: JSON.stringify({email}),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then(handleHttpResponse)
    }
  }
}
