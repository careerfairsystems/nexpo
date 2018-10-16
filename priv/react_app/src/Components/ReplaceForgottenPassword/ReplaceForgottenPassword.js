import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReplacePasswordForm from '../../Forms/ReplacePasswordForm';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';
import { NotFound } from '../../Screens/NotFound/NotFound';

type Props = {
  sendNewPasswordToBackend: func,
  verifyKey: func,
  keyIsValid: boolean,
  errors: {
    password: string[],
    passwordConfirmation: string[]
  }
};

class ReplaceForgottenPassword extends Component<Props> {
  componentDidMount() {
    const { verifyKey } = this.props;
    verifyKey();
  }

  sendQueryToBackend = values => {
    const { password, passwordConfirmation } = values;
    const { sendNewPasswordToBackend } = this.props;
    return sendNewPasswordToBackend({
      password,
      passwordConfirmation
    });
  };

  render() {
    const { keyIsValid, success } = this.props;

    if (!keyIsValid) {
      return <NotFound />;
    }
    if (success) {
      return (
        <SuccessMessage
          message="Successfully replaced password"
          linkText="Click here to login"
          linkUrl="/login"
        />
      );
    }

    return (
      <div className="replace-forgotten-password">
        <h1>Replace password</h1>
        <ReplacePasswordForm onSubmit={this.sendQueryToBackend} />
      </div>
    );
  }
}

ReplaceForgottenPassword.defaultProps = {
  success: false
};

ReplaceForgottenPassword.propTypes = {
  verifyKey: PropTypes.func.isRequired,
  sendNewPasswordToBackend: PropTypes.func.isRequired,
  keyIsValid: PropTypes.bool.isRequired,
  success: PropTypes.bool
};

export default ReplaceForgottenPassword;
