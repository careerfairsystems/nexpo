import React, { Component } from 'react';
import ReplacePasswordForm from '../../Forms/ReplacePasswordForm';
import SuccessMessage from '../SuccessMessage';
import { NotFound } from '../../Screens/NotFound/NotFound';

type PasswordObj = {|
  password: string,
  passwordConfirmation: string
|};
type Props = {
  sendNewPasswordToBackend: PasswordObj => Promise<{}>,
  verifyKey: () => Promise<{}>,
  keyIsValid: boolean,
  errors?: {
    password?: string[],
    passwordConfirmation?: string[]
  },
  success?: boolean
};

class ReplaceForgottenPassword extends Component<Props> {
  static defaultProps = {
    errors: {},
    success: false
  };

  componentDidMount() {
    const { verifyKey } = this.props;
    verifyKey();
  }

  sendQueryToBackend = (values: PasswordObj) => {
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

export default ReplaceForgottenPassword;
