import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import AlertWarning from 'material-ui/svg-icons/alert/warning';
import {yellow500} from 'material-ui/styles/colors';
import { Redirect } from 'react-router-dom'
import './DevelopmentLogin.css'
import HtmlTitle from '../../../Components/HtmlTitle'

/**
 * Handles authorization in development
 */
class DevelopLogin extends Component {

  state = {
    email: '',
    failure: false,
  }

  login() {
    const { email } = this.state

    this.setState({failure: false})

    fetch(`/api/development_login`, {
      method: 'POST',
      body: JSON.stringify({
        email: email
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
      console.error(err)
      this.setState({failure: true})
    })
  }

  render() {
    const { email, failure } = this.state
    const { isAuthenticated } = this.props

    // Url that redirected here
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    if(isAuthenticated) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <div className="DevelopmentLogin_Component">
        <HtmlTitle title="Dev Login"/>
        <AlertWarning color={yellow500} style={styles.icon}/>
        <h1>Development Login</h1>
        <TextField
          floatingLabelText="Email"
          errorText={failure ? 'User does not exist' : null}
          value={email}
          autoFocus
          onChange={(event, val) => this.setState({email: val})}
          onKeyPress={event => event.key === 'Enter' ? this.login() : null}
        />
        <br/>
        <br/>
        <RaisedButton
          label="Login as user"
          primary
          onTouchTap={() => this.login()}
        />
      </div>
    )
  }
}

const styles = {
  icon: {
    height: '200px',
    width: 'auto',
  }
}

export default DevelopLogin
