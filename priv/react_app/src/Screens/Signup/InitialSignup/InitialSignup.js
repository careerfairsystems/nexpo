import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import './InitialSignup.css';
import API from '../../../API';

import SuccessMessage from '../../../Components/SuccessMessage';

/**
 * Component which allows user to initiate a sign up process
 */
class InitialSignup extends Component {
  state = {
    email: '',
    errors: {},
    finished: false
  };

  signup = () => {
    const { email } = this.state;

    // reset errors to give user feedback that something happened
    this.setState({ errors: {} });

    API.signup
      .initialSignup(email)
      .then(() => this.setState({ finished: true }))
      .catch(err => this.setState({ errors: err.errors }));
  };

  renderUsernameInput = () => {
    const { email, errors } = this.state;
    return (
      <TextField
        floatingLabelText="Email"
        errorText={errors.email ? errors.email[0] : null}
        value={email}
        autoFocus
        onChange={(event, val) => this.setState({ email: val })}
        onKeyPress={event => (event.key === 'Enter' ? this.signup() : null)}
      />
    );
  };

  renderSignupButton = () => (
    <RaisedButton label="Sign up" primary onClick={() => this.signup()} />
  );

  render() {
    const { finished } = this.state;

    if (finished) {
      return <SuccessMessage message="Please check your inbox" />;
    }
    return (
      <div className="GatherEmail_Component">
        <h1>Sign up</h1>
        <h2>Please enter your email</h2>
        {this.renderUsernameInput()}
        <br />
        <br />
        {this.renderSignupButton()}
        <br />
        <br />
        <div>Already have an account?</div>
        <br />
        <div className="links">
          <Link to="/login">Log in</Link>
        </div>
      </div>
    );
  }
}

export default InitialSignup;
