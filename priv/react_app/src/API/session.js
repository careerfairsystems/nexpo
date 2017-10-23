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
    .then(res => res.json())
  }
}
