import React, { Component } from 'react';
import { SubmissionError } from 'redux-form';
import { Link } from 'react-router-dom';
import API from '../../../../API';
import SignupForm from '../../../../Forms/SignupForm';
import SuccessMessage from '../../../../Components/SuccessMessage';

/**
 * Component which allows user to initiate a sign up process
 */
type State = {
  finished: boolean
};
class InitialSignup extends Component<{}, State> {
  state = {
    finished: false
  };

  signup = (values: { email: string }) => {
    const { email } = values;
    return API.signup
      .initialSignup(email)
      .then(() => this.setState({ finished: true }))
      .catch(err => {
        throw new SubmissionError({ ...err.errors });
      });
  };

  render() {
    const { finished } = this.state;

    if (finished) {
      return <SuccessMessage message="Please check your inbox" />;
    }
    return (
      <div className="initial-signup">
        <h1>Sign Up</h1>
        <h2>Please enter your email</h2>
        <SignupForm onSubmit={this.signup} />
        <br />
        <br />
        <div className="existing-account">
          Already have an account?
          <br />
          <Link to="/login">Log in</Link>
        </div>
      </div>
    );
  }
}

export default InitialSignup;
