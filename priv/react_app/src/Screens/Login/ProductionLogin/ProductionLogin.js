import React, { Component } from 'react'
import './ProductionLogin.css'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { Redirect } from 'react-router-dom'

/**
 * Handles login in production. Supports redirecting to back to the route that redirected here
 *
 * This is not integrated with rest of application as there are another pull request touching state
 * - It can authenticate a user, it simply needs to be integrated in global state
 */
class ProductionLogin extends Component {

  state = {
    email: '',
    password: '',
    failure: false,
  }

  login() {
    const { email, password } = this.state

    this.setState({failure: false})

    fetch(`/api/login`, {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
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
      this.setState({failure: false})
      alert(`
        Success!
        JWT: ${res.data.jwt}
      `)
    })
    .catch(err => {
      console.log(err)
      this.setState({failure: true})
    })
  }

  render() {
    const { email, password, failure } = this.state
    const { isAuthenticated } = this.props

    // Url that redirected here
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    if(isAuthenticated) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <div className="ProductionLogin_Component">
        <h1>Login</h1>
        <TextField
          floatingLabelText="Email"
          errorText={failure ? 'Try something else' : null}
          value={email}
          autoFocus
          onChange={(event, val) => this.setState({email: val})}
          onKeyPress={event => event.key === 'Enter' ? this.login() : null}
        />
        <br/>
        <TextField
          floatingLabelText="Password"
          errorText={failure ? 'Try something else' : null}
          value={password}
          type='password'
          onChange={(event, val) => this.setState({password: val})}
          onKeyPress={event => event.key === 'Enter' ? this.login() : null}
        />
        <br/>
        <RaisedButton
          label="Login"
          primary
          onTouchTap={() => this.login()}
        />
        <Snackbar
          open={this.state.failure}
          message="That email and password combination is incorrect"
          autoHideDuration={4000}
        />
      </div>
    )
  }
}

export default ProductionLogin

