import { handleHttpResponse } from './utils';

type finalSignupBody = {
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
  get_current_signup: (signupKey: string) =>
    fetch(`/api/initial_signup/${signupKey}`).then(handleHttpResponse),

  finalize_signup: (signupKey: string, body: finalSignupBody) =>
    fetch(`/api/final_signup/${signupKey}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(handleHttpResponse)
};
