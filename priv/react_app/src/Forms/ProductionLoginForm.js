import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Input, Form } from 'antd';
import makeField, { required } from './helper';

const TextInput = makeField(Input);
const ProductionLoginForm = ({ handleSubmit, submitting }) => (
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
    <Field
      name="password"
      label="Password"
      component={TextInput}
      type="password"
      required
      validate={[required]}
    />
    <Button disabled={submitting} type="primary" htmlType="submit">
      Login
    </Button>
  </Form>
);

ProductionLoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  formState: state.form.ProductionLoginForm
});

const stateful = connect(mapStateToProps);

export default stateful(
  reduxForm({ form: 'productionLogin' })(ProductionLoginForm)
);
