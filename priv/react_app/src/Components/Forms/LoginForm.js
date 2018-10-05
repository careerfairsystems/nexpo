import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Input, Form } from 'antd';
import makeField, { required } from './helper';

const TextInput = makeField(Input);
const LoginForm = ({ handleSubmit, submitting }) => (
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
    <Field
      name="password"
      label="Password"
      component={TextInput}
      type="password"
      required
      style={{ width: 400 }}
      validate={[required]}
    />
    <Button disabled={submitting} type="primary" htmlType="submit">
      Login
    </Button>
  </Form>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  formState: state.form.LoginForm
});

const stateful = connect(mapStateToProps);

export default stateful(reduxForm({ form: 'login' })(LoginForm));
