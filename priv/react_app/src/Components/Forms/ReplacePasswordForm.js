import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Input, Form } from 'antd';
import makeField, { validatePassword } from './helper';

const TextInput = makeField(Input);
const required = value => (value ? undefined : 'Cant be blank');
const ReplacePasswordForm = ({ handleSubmit, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="password"
      label="Password"
      component={TextInput}
      type="password"
      required
      autoFocus
      style={{ width: 400 }}
      validate={[required]}
    />
    <Field
      name="passwordConfirmation"
      label="Confirm new Password"
      component={TextInput}
      type="password"
      required
      style={{ width: 400 }}
      validate={[required]}
    />
    <Button disabled={submitting} type="primary" htmlType="submit">
      Update password
    </Button>
  </Form>
);

ReplacePasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  formState: state.form.ReplacePasswordForm
});

const stateful = connect(mapStateToProps);

export default stateful(
  reduxForm({ form: 'replacePassword', validate: validatePassword })(
    ReplacePasswordForm
  )
);
