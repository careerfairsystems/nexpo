import React, { Component } from 'react'
import './ProductionLogin.css'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { Redirect, Link } from 'react-router-dom'
import HtmlTitle from '../../../Components/HtmlTitle'

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
    password: ''
  }

  _login() {
    this.setState({error: false})
    const { email, password } = this.state
    this.props.login({email, password})
  }

  _renderEmailInput = () => {
    const { email } = this.state
    return (
      <TextField
        floatingLabelText="Email"
        errorText={this.props.error ? 'Try something else' : null}
        value={email}
        autoFocus
        onChange={(event, val) => this.setState({email: val})}
        onKeyPress={event => event.key === 'Enter' ? this._login() : null}
      />
    )
  }

  _renderPasswordInput = () => {
    const { password } = this.state
    return (
      <TextField
        floatingLabelText="Password"
        errorText={this.props.error ? 'Try something else' : null}
        value={password}
        type='password'
        onChange={(event, val) => this.setState({password: val})}
        onKeyPress={event => event.key === 'Enter' ? this._login() : null}
      />
    )
  }

  _renderLoginButton = () => (
      <RaisedButton
        label="Login"
        primary
        onTouchTap={() => this._login()}
      />
    )

  render() {
    const { error, isLoggedIn } = this.props

    // Url that redirected here
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    if(isLoggedIn) {
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

        <div>Hard time logging in?</div>
        <br/>

        <div className="links">
          <Link to="/signup">Sign up</Link>
          <Link to="/forgot-password">Forgot password</Link>
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

