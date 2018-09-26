import { handleHttpResponse } from './utils';

type final_signup_body = {
  password: string,
  password_confirmation: string,
  first_name: string,
  last_name: string
};

export default {
  /**
   * Initiates a signup
   */
  initial_signup: (email: string) =>
    fetch('/api/initial_signup', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(handleHttpResponse),

  /**
   * Gets an ongoing signup process
   */
  get_current_signup: (signup_key: string) =>
    fetch(`/api/initial_signup/${signup_key}`).then(handleHttpResponse),

  finalize_signup: (signup_key: string, body: final_signup_body) =>
    fetch(`/api/final_signup/${signup_key}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(handleHttpResponse)
};
