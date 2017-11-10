import {getJwt} from './../Util/JwtHelper'
import {handleHttpFailure} from './index'

export default {

  /**
   * Gets the current user
   */
  getMe: () => {
    return fetch('/api/me', {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getJwt()}`
      })
    })
    .then(handleHttpFailure)
  }
}
