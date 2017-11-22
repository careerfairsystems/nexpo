import React, {Component} from 'react'
import './ReplaceForgottenPassword.css'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import ErrorMessage from './../ErrorMessage'

type Props = {
  sendNewPasswordToBackend: func,
  hashKey: string,
  verifyKey: func,
  keyIsValid: bool
}

class ReplaceForgottenPassword extends Component<Props> {
  static propTypes = {
    verifyKey: PropTypes.func.isRequired,
    sendNewPasswordToBackend: PropTypes.func.isRequired,
    hashKey: PropTypes.string.isRequired,
    keyIsValid: PropTypes.bool.isRequired
  }

  state = {
    password: '',
    password_confirmation: ''
  }

  componentDidMount() {
    this.props.verifyKey()
  }

  _setPassword = (val) => {
    this.setState({password: val})
  }

  _setPasswordConfirmation = (val) => {
    this.setState({password_confirmation: val})
  }

  _sendQueryToBackend = () => {
    const {password, password_confirmation} = this.state
    this.props.sendNewPasswordToBackend({password, password_confirmation})
  }

  render() {
    const {keyIsValid} = this.props

    if(!keyIsValid) {
      return (
        <ErrorMessage
          message="This link does not seem to exist"
        />
      )
    }

    return (
      <div className="ReplaceForgottenPassword_Component">
        <h1>Replace password</h1>
        <TextField
          floatingLabelText="New password"
          type='password'
          value={this.state.password}
          onChange={(e, val) => this._setPassword(val)}
        />
        <TextField
          floatingLabelText="Confirm new password"
          type='password'
          value={this.state.password_confirmation}
          onChange={(e, val) => this._setPasswordConfirmation(val)}
        />
        <br/>
        <RaisedButton
          label="Update password"
          primary
          onTouchTap={this._sendQueryToBackend}
        />
      </div>
    )
  }
}

export default ReplaceForgottenPassword
