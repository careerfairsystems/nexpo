import React, {Component} from 'react'
import './ForgotPasswordEnterEmail.css'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';

type Props = {
  callBackend: func
}
class ForgotPasswordEnterEmail extends Component<Props> {
  static propTypes = {
    callBackend: PropTypes.func.isRequired
  }

  state = {
    email: ''
  }

  _updateEmail = val => {
    this.setState({email: val})
  }

  _queryBackend = () => {
    const {email} = this.state
    this.props.callBackend({email})
  }

  render() {
    return (
      <div className="ForgotPasswordEnterEmail_Component">

        <h1>Forgot password</h1>

        <TextField
          floatingLabelText="Email"
          type='email'
          value={this.state.email}
          onChange={(e, val) => this._updateEmail(val)}
        />

        <br/>

        <RaisedButton
          primary
          label="Send email"
          onTouchTap={this._queryBackend}
        />
      </div>
    )
  }
}

export default ForgotPasswordEnterEmail
