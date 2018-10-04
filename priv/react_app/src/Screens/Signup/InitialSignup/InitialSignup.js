import React, { Component } from 'react';
import { SubmissionError } from 'redux-form';
import { Link } from 'react-router-dom';
import './InitialSignup.css';
import API from '../../../API';
import SignupForm from '../../../Components/Forms/SignupForm';
import SuccessMessage from '../../../Components/SuccessMessage';

/**
 * Component which allows user to initiate a sign up process
 */
class InitialSignup extends Component {
  state = {
    finished: false
  };

  signup = values => {
    const { email } = values;
    API.signup
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
      <div className="GatherEmail_Component">
        <h1>Sign up</h1>
        <h2>Please enter your email</h2>
        <SignupForm onSubmit={this.signup} />
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
