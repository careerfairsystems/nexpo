import {getJwt} from './../Util/JwtHelper'

export default {

  /**
   * Gets the current user
   */
  getMe: () => {
    return fetch('/api/me', {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authentication': `Bearer ${getJwt()}`
      })
    })
    .then(res => {
      console.log("WILL GET JSON")
      return res.json()
    })
  }
}
