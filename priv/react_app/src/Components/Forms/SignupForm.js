import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Input, Form } from 'antd';
import makeField from './helper';

const TextInput = makeField(Input);
const required = value => (value ? undefined : 'Cant be blank');
const SignupForm = ({ handleSubmit, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="email"
      label="Email"
      component={TextInput}
      type="email"
      required
      autoFocus
      style={{ width: 400 }}
      validate={[required]}
    />
    <Button disabled={submitting} type="primary" htmlType="submit">
      Sign up
    </Button>
  </Form>
);

SignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  formState: state.form.SignupForm
});

const stateful = connect(mapStateToProps);

export default stateful(reduxForm({ form: 'signup' })(SignupForm));
