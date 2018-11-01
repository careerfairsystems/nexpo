import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Input, Form } from 'antd';
import makeField, { required, validatePassword } from './helper';

const TextInput = makeField(Input);
type Props = {
  handleSubmit: () => Promise<void>,
  submitting: boolean
};
const ForgotPasswordForm = ({ handleSubmit, submitting }: Props) => (
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

const mapStateToProps = state => ({
  formState: state.form.ForgotPasswordForm
});

const stateful = connect(mapStateToProps);

export default stateful(
  reduxForm({ form: 'forgotPassword', validate: validatePassword })(
    ForgotPasswordForm
  )
);
