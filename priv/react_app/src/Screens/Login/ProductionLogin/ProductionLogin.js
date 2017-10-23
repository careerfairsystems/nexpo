import React, { Component } from 'react'
import './ProductionLogin.css'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { Redirect, Link } from 'react-router-dom'
import HtmlTitle from '../../../Components/HtmlTitle'
import API, {setJwt} from '../../../API'
import {isNil} from 'ramda'

/**
 * Handles login in production. Supports redirecting back to the route that redirected here
 *
 * This is not integrated with rest of application as there are another pull request touching state
 * - It can authenticate a user, it simply needs to be integrated into global state
 * - By passing isAuthenticated prop, this component will redirect back to where user came from
 */
class ProductionLogin extends Component {

  state = {
    email: '',
    password: '',
    error: false,
  }

  _login() {
    const { email, password } = this.state

    this.setState({error: false})

    API.session.login({email, password})
    .then(res => {
      if(isNil(res.error)) {
        setJwt(res.data.jwt)
        this.setState({error: false})
      }
      else {
        this.setState({error: true})
      }
    })
  }

  _renderEmailInput = () => {
    const { email, error } = this.state
    return (
      <TextField
        floatingLabelText="Email"
        errorText={error ? 'Try something else' : null}
        value={email}
        autoFocus
        onChange={(event, val) => this.setState({email: val})}
        onKeyPress={event => event.key === 'Enter' ? this._login() : null}
      />
    )
  }

  _renderPasswordInput = () => {
    const { password, error } = this.state
    return (
      <TextField
        floatingLabelText="Password"
        errorText={error ? 'Try something else' : null}
        value={password}
        type='password'
        onChange={(event, val) => this.setState({password: val})}
        onKeyPress={event => event.key === 'Enter' ? this._login() : null}
      />
    )
  }

  _renderLoginButton = () => {
    return (
      <RaisedButton
        label="Login"
        primary
        onTouchTap={() => this._login()}
      />
    )
  }

  render() {
    const { error } = this.state
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
        <HtmlTitle title="Login" />

        <h1>Login</h1>
        {this._renderEmailInput()}
        <br/>
        {this._renderPasswordInput()}
        <br/>
        {this._renderLoginButton()}

        <br/>
        <br/>

        <div>Can't login?</div>
        <br/>

        <div className="links">
          <Link to="/signup">Sign up</Link>
        </div>

        <Snackbar
          open={error}
          message="That email and password combination is incorrect"
          autoHideDuration={4000}
        />
      </div>
    )
  }
}

export default ProductionLogin

