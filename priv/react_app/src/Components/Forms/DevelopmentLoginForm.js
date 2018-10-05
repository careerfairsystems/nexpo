import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Input, Form } from 'antd';
import makeField from './helper';

const TextInput = makeField(Input);
const DevelopmentLoginForm = ({ handleSubmit, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="email"
      label="Email"
      component={TextInput}
      type="email"
      autoFocus
      style={{ width: 400 }}
    />
    <Button disabled={submitting} type="primary" htmlType="submit">
      Login as User
    </Button>
  </Form>
);

DevelopmentLoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  formState: state.form.DevelopmentLoginForm
});

const stateful = connect(mapStateToProps);

export default stateful(
  reduxForm({ form: 'developmentLogin' })(DevelopmentLoginForm)
);
