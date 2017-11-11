import {handleHttpResponse} from './index'

type final_signup_body = {
  password: string,
  password_confirmation: string,
  first_name: string,
  last_name: string
}

export default {

  /**
   * Initiates a signup
   */
  initial_signup: (username: string) => {
    return fetch(`/api/initial_signup`, {
      method: 'POST',
      body: JSON.stringify({username}),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(handleHttpResponse)
  },

  /**
   * Gets an ongoing signup process
   */
  get_current_signup: (signup_key: string) => {
    return fetch(`/api/initial_signup/${signup_key}`)
    .then(handleHttpResponse)
  },

  finalize_signup: (signup_key: string, body: final_signup_body) => {
    return fetch(`/api/final_signup/${signup_key}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(handleHttpResponse)
  }

}
