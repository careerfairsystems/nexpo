import { handleHttpResponse } from './utils';
import { snakeCaseKeys } from '../Util/FormatHelper';

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
  initialSignup: (email: string) =>
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
  getCurrentSignup: (signupKey: string) =>
    fetch(`/api/initial_signup/${signupKey}`).then(handleHttpResponse),

  finalizeSignup: (signupKey: string, body: finalSignupBody) =>
    fetch(`/api/final_signup/${signupKey}`, {
      method: 'POST',
      body: JSON.stringify(snakeCaseKeys(body)),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(handleHttpResponse)
};
