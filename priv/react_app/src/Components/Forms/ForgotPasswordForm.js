import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Input, Form } from 'antd';
import makeField, { required, validatePassword } from './helper';

const TextInput = makeField(Input);
const ForgotPasswordForm = ({ handleSubmit, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="email"
      label="Email"
      component={TextInput}
      type="email"
      required
      autoFocus
      validate={[required]}
    />
    <Button disabled={submitting} type="primary" htmlType="submit">
      Send email
    </Button>
  </Form>
);

ForgotPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  formState: state.form.ForgotPasswordForm
});

const stateful = connect(mapStateToProps);

export default stateful(
  reduxForm({ form: 'forgotPassword', validate: validatePassword })(
    ForgotPasswordForm
  )
);
