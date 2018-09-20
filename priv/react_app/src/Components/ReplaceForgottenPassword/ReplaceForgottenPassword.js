import React, { Component } from 'react';
import './ReplaceForgottenPassword.css';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';
import { NotFound } from '../../Screens/NotFound/NotFound';

type Props = {
  sendNewPasswordToBackend: func,
  hashKey: string,
  verifyKey: func,
  keyIsValid: boolean,
  errors: {
    password: string[],
    password_confirmation: string[]
  },
  success: boolean
};

class ReplaceForgottenPassword extends Component<Props> {
  static propTypes = {
    verifyKey: PropTypes.func.isRequired,
    sendNewPasswordToBackend: PropTypes.func.isRequired,
    hashKey: PropTypes.string.isRequired,
    keyIsValid: PropTypes.bool.isRequired,
    errors: PropTypes.object,
    success: PropTypes.bool
  };

  static defaultProps = {
    errors: {},
    success: false
  };

  state = {
    password: '',
    password_confirmation: ''
  };

  componentDidMount() {
    this.props.verifyKey();
  }

  _setPassword = val => {
    this.setState({ password: val });
  };

  _setPasswordConfirmation = val => {
    this.setState({ password_confirmation: val });
  };

  _sendQueryToBackend = () => {
    const { password, password_confirmation } = this.state;
    this.props.sendNewPasswordToBackend({ password, password_confirmation });
  };

  render() {
    let { keyIsValid, errors, success } = this.props;
    errors = {
      password: errors.password || [],
      password_confirmation: errors.password_confirmation || []
    };

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
        <TextField
          floatingLabelText="New password"
          type="password"
          value={this.state.password}
          onChange={(e, val) => this._setPassword(val)}
          errorText={errors.password.length > 0 ? errors.password[0] : ''}
          onKeyPress={event =>
            event.key === 'Enter' ? this._sendQueryToBackend() : null
          }
        />
        <TextField
          floatingLabelText="Confirm new password"
          type="password"
          value={this.state.password_confirmation}
          onChange={(e, val) => this._setPasswordConfirmation(val)}
          errorText={
            errors.password_confirmation.length > 0
              ? errors.password_confirmation[0]
              : ''
          }
          onKeyPress={event =>
            event.key === 'Enter' ? this._sendQueryToBackend() : null
          }
        />
        <br />
        <RaisedButton
          label="Update password"
          primary
          onClick={this._sendQueryToBackend}
        />
      </div>
    );
  }
}

export default ReplaceForgottenPassword;
