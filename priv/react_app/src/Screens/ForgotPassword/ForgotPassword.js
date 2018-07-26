import React from 'react';
import './ForgotPassword.css';
import UrlHelper from '../../Util/URLHelper';
import HtmlTitle from '../../Components/HtmlTitle';
import ForgotPasswordEnterEmail from '../../Components/ForgotPasswordEnterEmail';
import ReplaceForgottenPassword from '../../Components/ReplaceForgottenPassword';

const ForgotPassword = () => {
  const key = UrlHelper.getParameterByName('key');

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
