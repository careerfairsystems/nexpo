import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Input, Form } from 'antd';
import makeField, { required } from './helper';

const TextInput = makeField(Input);

type Props = {
  handleSubmit: () => Promise<void>,
  submitting: boolean
};
const ProductionLoginForm = ({ handleSubmit, submitting }: Props) => (
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

const mapStateToProps = state => ({
  formState: state.form.ProductionLoginForm
});

const stateful = connect(mapStateToProps);

export default stateful(
  reduxForm({ form: 'productionLogin' })(ProductionLoginForm)
);
