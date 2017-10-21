// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import './FinalizeSignup.css'

import { Redirect } from 'react-router-dom'

type Props = {
  signupKey: string
}

type State = {
  email: string,
  password: string,
  passwordConf: string,
  firstName: string,
  lastName: string,
  failure: boolean,
  noSuchKey: boolean
}

class GatherDetails extends Component<Props, State> {

  state = {
    email: '',
    password: '',
    passwordConf: '',
    firstName: '',
    lastName: '',
    failure: false,
    noSuchKey: false
  }

  componentDidMount() {
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
      const user = res.data
      this.setState({email: user.email})
    })
    .catch(err => {
      this.setState({noSuchKey: true})
      console.error(err)
    })
  }

  _signup = () => {
    const {signupKey} = this.props
    const {password,passwordConf,firstName,lastName} = this.state
    const params = {
      password,
      passwordConfirmation: passwordConf,
      firstName,
      lastName
    }
    fetch(`/api/final_signup/${signupKey}`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      else {
        throw Error(res.statusText)
      }
    })
    .then(res => {
      // this.setState({failure: false})
      alert('Success!')
    })
    .catch(err => {
      console.log(err)
      // this.setState({failure: true})
    })
  }

  render() {
    const {
      email,
      password,
      passwordConf,
      firstName,
      lastName,
      failure,
      noSuchKey
    } = this.state

    // Redirect to root url if sign up key is incorrect
    if(noSuchKey) {
      return <Redirect to='/' />
    }

    return (
      <div className="GatherDetails_Component">
        <h1>Sign up</h1>
        <TextField
          floatingLabelText="Email"
          errorText={failure ? 'Try something else' : null}
          value={email}
          disabled
          onChange={(event, val) => this.setState({email: val})}
        />
        <br/>
        <TextField
          floatingLabelText="Password"
          errorText={failure ? 'Try something else' : null}
          value={password}
          type='password'
          onChange={(event, val) => this.setState({password: val})}
        />
        <TextField
          floatingLabelText="Password confirmation"
          errorText={failure ? 'Try something else' : null}
          value={passwordConf}
          type='password'
          onChange={(event, val) => this.setState({passwordConf: val})}
        />
        <TextField
          floatingLabelText="First name"
          value={firstName}
          onChange={(event, val) => this.setState({firstName: val})}
        />
        <TextField
          floatingLabelText="Last name"
          value={lastName}
          onChange={(event, val) => this.setState({lastName: val})}
        />
        <br/>
        <RaisedButton
          label="Sign up"
          primary
          onTouchTap={() => this._signup()}
        />
      </div>
    )
  }
}

GatherDetails.propTypes = {
  signupKey: PropTypes.string.isRequired
}

GatherDetails.defaultProps = {
  signupKey: '' //Change this
}

export default GatherDetails
