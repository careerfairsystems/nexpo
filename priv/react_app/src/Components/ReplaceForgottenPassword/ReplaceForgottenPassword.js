import React, { Component } from 'react';
import './ReplaceForgottenPassword.css';
import PropTypes from 'prop-types';
import ReplacePasswordForm from '../Forms/ReplacePasswordForm';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';
import { NotFound } from '../../Screens/NotFound/NotFound';

type Props = {
  sendNewPasswordToBackend: func,
  verifyKey: func,
  keyIsValid: boolean,
  errors: {
    password: string[],
    password_confirmation: string[]
  },
  success: boolean
};

class ReplaceForgottenPassword extends Component<Props> {
  componentDidMount() {
    this.props.verifyKey();
  }

  sendQueryToBackend = values => {
    const { password, passwordConfirmation } = values;
    const { sendNewPasswordToBackend } = this.props;
    return sendNewPasswordToBackend({
      password,
      password_confirmation: passwordConfirmation
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
      <div className="ReplaceForgottenPassword_Component">
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
