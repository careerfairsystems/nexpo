import React from 'react';
import { getParameterByName } from '../../../Util/URLHelper';
import InitialSignup from './InitialSignup';
import FinalizeSignup from './FinalizeSignup';
import HtmlTitle from '../../../Components/HtmlTitle';

/**
 * A component which defines the signup page
 * It renders a form for either step 1 or step 2 of sign up process,
 * depending on the url
 */
const Signup = () => {
  const key = getParameterByName('key');

  return (
    <div>
      <HtmlTitle title="Signup" />

      {!key ? <InitialSignup /> : <FinalizeSignup signupKey={key} />}
    </div>
  );
};

export default Signup;
