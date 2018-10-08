import React from 'react';
import { getParameterByName } from '../../../Util/URLHelper';
import HtmlTitle from '../../../Components/HtmlTitle';
import ForgotPasswordEnterEmail from '../../../Components/ForgotPasswordEnterEmail';
import ReplaceForgottenPassword from '../../../Components/ReplaceForgottenPassword';

const ForgotPassword = () => {
  const key = getParameterByName('key');

  return (
    <div>
      <HtmlTitle title="Forgot password" />
      {!key ? (
        <ForgotPasswordEnterEmail />
      ) : (
        <ReplaceForgottenPassword hashKey={key} />
      )}
    </div>
  );
};

export default ForgotPassword;
