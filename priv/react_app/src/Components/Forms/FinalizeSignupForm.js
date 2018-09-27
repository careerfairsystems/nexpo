import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Input, Form } from 'antd';
import makeField from './helper';

const TextInput = makeField(Input);
const required = value => (value ? undefined : "Field can't be empty");

const validatePasswords = values => {
  const errors = {};
  if (values && values.password && values.passwordConfirmation) {
    if (values.password !== values.passwordConfirmation) {
      errors.passwordConfirmation = 'Passwords Must Match';
    }
  }
  return errors;
};

const FinalizeSignupForm = ({ handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="email"
      label="Email"
      component={TextInput}
      disabled
      validate={required}
    />
    <Field
      name="password"
      label="Password"
      type="password"
      component={TextInput}
      validate={required}
    />
    <Field
      name="passwordConfirmation"
      label="Password Confirmation"
      type="password"
      component={TextInput}
      validate={required}
    />
    <Field
      name="firstName"
      label="First Name"
      component={TextInput}
      validate={required}
    />
    <Field
      name="lastName"
      label="Last Name"
      component={TextInput}
      validate={required}
    />
    <Button type="primary" htmlType="submit">
      Sign up
    </Button>
  </Form>
);

FinalizeSignupForm.defaultProps = {};

FinalizeSignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  formState: state.form.FinalizeSignupForm
});

const stateful = connect(mapStateToProps);

export default stateful(
  reduxForm({
    form: 'finalizeSignup',
    validate: validatePasswords,
    enableReinitialize: true
  })(FinalizeSignupForm)
);
