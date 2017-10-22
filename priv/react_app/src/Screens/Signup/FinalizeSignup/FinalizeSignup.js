// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import './FinalizeSignup.css'

import ErrorMessage from '../../../Components/ErrorMessage'
import SuccessMessage from '../../../Components/SuccessMessage'
import {isNil} from 'ramda'

type Props = {
  signupKey: string
}

type State = {
  email: string,
  password: string,
  password_confirmation: string,
  first_name: string,
  last_name: string,
  errors: object,
  noSuchKey: boolean,
  finished: boolean
}

/**
 * A component which allows users to complete a sign up process
 */
class FinalizeSignup extends Component<Props, State> {

  state = {
    email: undefined,
    password: undefined,
    password_confirmation: undefined,
    first_name: undefined,
    last_name: undefined,
    errors: {},
    noSuchKey: false,
    finished: false
  }

  componentDidMount() {
    // Fetch current sign up process from backend
    this._fetchCurrentSignup()
  }

  _fetchCurrentSignup = () => {
    const { signupKey } = this.props
    fetch(`/api/initial_signup/${signupKey}`)
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      else {
        throw Error("No such key exists")
      }
    })
    .then(res => {
      // Signup key is valid
      const user = res.data
      this.setState({email: user.email})
    })
    .catch(err => {
      // Sign up key is invalid
      this.setState({noSuchKey: true})
      console.error(err)
    })
  }

  _signup = () => {
    const {signupKey} = this.props
    const {password,password_confirmation,first_name,last_name} = this.state
    const params = {
      password,
      password_confirmation,
      first_name,
      last_name
    }
    fetch(`/api/final_signup/${signupKey}`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .then(res => {
      // Signup successful
      if(isNil(res.errors)) {
        this.setState({errors: {}, finished: true})
      }
      // There was errors
      else {
        this.setState({errors: res.errors})
      }
    })
    .catch(err => {
      console.error(err)
    })
  }

  _renderEmailInput = () => {
    const { email } = this.state
    return (
      <TextField
        floatingLabelText="Email"
        value={email || ''}
        disabled
        type='text'
        onChange={(event, val) => this.setState({email: val})}
      />
    )
  }

  _renderPasswordInput = () => {
    const { password, errors } = this.state
    return (
      <TextField
        floatingLabelText="Password"
        errorText={errors.password ? errors.password[0] : null}
        value={password || ''}
        type='password'
        onChange={(event, val) => this.setState({password: val})}
      />
    )
  }

  _renderPasswordConfirmationInput = () => {
    const { password_confirmation, errors } = this.state
    return (
      <TextField
        floatingLabelText="Password confirmation"
        errorText={
          errors.password_confirmation
          ? errors.password_confirmation[0] : null
        }
        value={password_confirmation || ''}
        type='password'
        onChange={(event, val) => this.setState({password_confirmation: val})}
      />
    )
  }

  _renderFirstNameInput = () => {
    const { first_name, errors } = this.state
    return (
      <TextField
        floatingLabelText="First name"
        errorText={errors.first_name ? errors.first_name[0] : null}
        value={first_name || ''}
        onChange={(event, val) => this.setState({first_name: val})}
      />
    )
  }

  _renderLastNameInput = () => {
    const { last_name, errors } = this.state
    return (
      <TextField
        floatingLabelText="Last name"
        errorText={errors.last_name ? errors.last_name[0] : null}
        value={last_name || ''}
        onChange={(event, val) => this.setState({last_name: val})}
      />
    )
  }

  _renderSignupButton = () => {
    return (
      <RaisedButton
        label="Sign up"
        primary
        onTouchTap={() => this._signup()}
      />
    )
  }

  render() {
    const { noSuchKey, finished } = this.state

    // Redirect to root url if sign up key is incorrect
    if(noSuchKey) {
      return (
        <ErrorMessage
          message="This link seems to be broken!"
          linkUrl="/signup"
          linkText="Click here to sign up"
        />
      )
    }
    else if(finished) {
      return (
        <SuccessMessage
          message="You have signed up!"
          linkUrl="/"
          linkText="Click here to go home"
        />
      )
    }

    return (
      <div className="GatherDetails_Component">
        <h1>Sign up</h1>
        {this._renderEmailInput()}
        {this._renderPasswordInput()}
        {this._renderPasswordConfirmationInput()}
        {this._renderFirstNameInput()}
        {this._renderLastNameInput()}
        <br/>
        <br/>
        {this._renderSignupButton()}
      </div>
    )
  }
}

FinalizeSignup.propTypes = {
  signupKey: PropTypes.string.isRequired
}

FinalizeSignup.defaultProps = {
  signupKey: undefined
}

export default FinalizeSignup
