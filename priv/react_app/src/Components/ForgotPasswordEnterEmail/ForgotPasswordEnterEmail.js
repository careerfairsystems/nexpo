import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ForgotPasswordForm from '../../Forms/ForgotPasswordForm';
import SuccessMessage from '../SuccessMessage';

type Props = {
  callBackend: ({ email: string }) => () => Promise<void>,
  success?: boolean
};

class ForgotPasswordEnterEmail extends Component<Props> {
  static defaultProps = {
    success: false
  };

  queryBackend = (values: { email: string }) => {
    const { email } = values;
    const { callBackend } = this.props;
    callBackend({ email });
  };

  render() {
    const { success } = this.props;
    if (success) {
      return (
        <SuccessMessage
          message="An email has been sent to the address you specified!"
          linkText="Click here to go home"
          linkUrl="/"
        />
      );
    }
    return (
      <div className="forgot-password-enter-email">
        <h1>Forgot password</h1>

        <ForgotPasswordForm onSubmit={this.queryBackend} />

        <br />
        <br />

        <div className="existing-account">
          Already have an account?
          <br />
          <Link to="/login">Log in</Link>
        </div>
      </div>
    );
  }
}

export default ForgotPasswordEnterEmail;
