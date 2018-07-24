import React, { Component } from 'react'
import './ForgotPasswordEnterEmail.css'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom'
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';

type Props = {
  callBackend: boolean,
  success: boolean
}
class ForgotPasswordEnterEmail extends Component<Props> {
  static propTypes = {
    callBackend: PropTypes.func.isRequired,
    success: PropTypes.bool
  }

  static defaultProps = {
    success: false
  }

  state = {
    email: ''
  }

  _updateEmail = val => {
    this.setState({ email: val })
  }

  _queryBackend = () => {
    const { email } = this.state
    this.props.callBackend({ email })
  }

  render() {
    const { success } = this.props
    if (success) {
      return (
        <SuccessMessage
          message="An email has been sent to the address you specified!"
          linkText="Click here to go home"
          linkUrl="/"
        />
      )
    }
    return (
      <div className="ForgotPasswordEnterEmail_Component">

        <h1>Forgot password</h1>

        <TextField
          floatingLabelText="Email"
          type='email'
          value={this.state.email}
          onChange={(e, val) => this._updateEmail(val)}
          onKeyPress={event => event.key === 'Enter' ? this._queryBackend() : null}
        />

        <br />

        <RaisedButton
          primary
          label="Send email"
          onTouchTap={this._queryBackend}
        />
        <br/>
        <br/>

        <div>Already have an account?</div>
        <br />
        <div className="links">
          <Link to="/login">Log in</Link>
        </div>
      </div>
    )
  }
}

export default ForgotPasswordEnterEmail
