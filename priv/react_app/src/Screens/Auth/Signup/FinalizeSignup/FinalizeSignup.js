import React, { Component } from 'react';
import { SubmissionError } from 'redux-form';
import { pick } from 'lodash/fp';
import ErrorMessage from '../../../../Components/ErrorMessage';
import SuccessMessage from '../../../../Components/SuccessMessage';
import API from '../../../../API';
import FinalizeSignupForm from '../../../../Forms/FinalizeSignupForm';

type Props = {
  signupKey: string
};

type State = {
  email: string,
  noSuchKey: boolean,
  finished: boolean
};

/**
 * A component which allows users to complete a sign up process
 */
class FinalizeSignup extends Component<Props, State> {
  state = {
    email: '',
    noSuchKey: false,
    finished: false
  };

  componentDidMount() {
    this.fetchCurrentSignup();
  }

  fetchCurrentSignup = () => {
    const { signupKey } = this.props;
    API.signup
      .getCurrentSignup(signupKey)
      .then(res => this.setState({ email: res.data.email }))
      .catch(() => this.setState({ noSuchKey: true }));
  };

  signup = (values: {
    password: string,
    passwordConfirmation: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
  }) => {
    const { signupKey } = this.props;
    const params = pick(
      [
        'password',
        'passwordConfirmation',
        'firstName',
        'lastName',
        'phoneNumber'
      ],
      values
    );

    return API.signup
      .finalizeSignup(signupKey, params)
      .then(() => this.setState({ finished: true }))
      .catch(err => {
        // This error will be shown in the form
        throw new SubmissionError({ ...err.errors });
      });
  };

  render() {
    const { email, finished, noSuchKey } = this.state;

    // Redirect to root url if sign up key is incorrect
    if (noSuchKey) {
      return (
        <ErrorMessage
          message="This link seems to be broken!"
          linkUrl="/signup"
          linkText="Click here to sign up"
        />
      );
    }
    if (finished) {
      return (
        <SuccessMessage
          message="You have signed up!"
          linkUrl="/"
          linkText="Click here to go home"
        />
      );
    }
    return (
      <div className="finalize-signup">
        <h1>Sign Up</h1>
        <FinalizeSignupForm onSubmit={this.signup} initialValues={{ email }} />
      </div>
    );
  }
}

export default FinalizeSignup;
