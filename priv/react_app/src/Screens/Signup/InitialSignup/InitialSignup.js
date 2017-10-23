import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router-dom'
import './InitialSignup.css'
import { isNil } from 'ramda'
import API from '../../../API'

import SuccessMessage from '../../../Components/SuccessMessage'

/**
 * Component which allows user to initiate a sign up process
 */
class InitialSignup extends Component {

  state = {
    username: '',
    errors: {},
    finished: false,
  }

  _signup = () => {
    const { username } = this.state

    // reset errors to give user feedback that something happened
    this.setState({errors: {}})

    API.signup.initial_signup(username)
    .then(res => {
      isNil(res.errors)
        ? this.setState({finished: true})
        : this.setState({errors: res.errors})
    })
  }

  _renderUsernameInput = () => {
    const { username, errors } = this.state
    return (
      <TextField
        floatingLabelText="STiL-ID"
        errorText={errors.email ? errors.email[0] : null}
        value={username}
        autoFocus
        onChange={(event, val) => this.setState({username: val})}
        onKeyPress={event => event.key === 'Enter' ? this._signup() : null}
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

  render() {
    const { finished } = this.state


    if(finished) {
      return <SuccessMessage message="Please check your inbox"/>
    }
    return (
      <div className="GatherEmail_Component">
        <h1>Sign up</h1>
        <h2>Please enter your STiL-ID</h2>
        {this._renderUsernameInput()}
        <br/>
        <br/>
        {this._renderSignupButton()}
        <br/>
        <br/>
        <div>Already have an account?</div>
        <br/>
        <div className="links">
          <Link to="/login">Log in</Link>
        </div>
      </div>
    )
  }
}

export default InitialSignup
