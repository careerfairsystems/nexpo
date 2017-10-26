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
    .then(res => res.json())
    // It seems like fetch does not throw errors, so .catch will never be used
  },

  /**
   * Gets an ongoing signup process
   */
  get_current_signup: (signup_key: string) => {
    return fetch(`/api/initial_signup/${signup_key}`)
    .then(res => res.json())
  },

  finalize_signup: (signup_key: string, body: final_signup_body) => {
    return fetch(`/api/final_signup/${signup_key}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
  }

}
