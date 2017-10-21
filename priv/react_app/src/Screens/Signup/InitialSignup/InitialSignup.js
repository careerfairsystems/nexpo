import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import './InitialSignup.css'

class GatherEmail extends Component {

  state = {
    username: '',
    failure: false,
  }

  _signup = () => {
    const { username } = this.state

    // this.setState({failure: false})

    fetch(`/api/initial_signup`, {
      method: 'POST',
      body: JSON.stringify({
        username: username
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
      // this.setState({failure: false})
      alert('Success!')
    })
    .catch(err => {
      console.log(err)
      // this.setState({failure: true})
    })
  }

  render() {
    const { username, failure } = this.state
    return (
      <div className="GatherEmail_Component">
        <h1>Welcome</h1>
        <h2>Please enter your STiL-ID</h2>
        <TextField
          floatingLabelText="STiL-ID"
          errorText={failure ? 'That user already exists' : null}
          value={username}
          autoFocus
          onChange={(event, val) => this.setState({username: val})}
          onKeyPress={event => event.key === 'Enter' ? this._signup() : null}
        />
        <br/>
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

export default GatherEmail
