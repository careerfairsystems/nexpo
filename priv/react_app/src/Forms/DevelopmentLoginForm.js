import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Input, Form } from 'antd';
import makeField from './helper';

const TextInput = makeField(Input);

type Props = {
  handleSubmit: () => Promise<void>,
  submitting: boolean
};
const DevelopmentLoginForm = ({ handleSubmit, submitting }: Props) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="email"
      label="Email"
      component={TextInput}
      type="email"
      autoFocus
    />
    <Button disabled={submitting} type="primary" htmlType="submit">
      Login as User
    </Button>
  </Form>
);

const mapStateToProps = state => ({
  formState: state.form.DevelopmentLoginForm
});

const stateful = connect(mapStateToProps);

export default stateful(
  reduxForm({ form: 'developmentLogin' })(DevelopmentLoginForm)
);
