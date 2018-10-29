import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Input, Form } from 'antd';
import makeField, { required } from './helper';

const TextInput = makeField(Input);
const TextArea = makeField(Input.TextArea);

type Props = {
  handleSubmit: () => Promise<void>,
  pristine: boolean
};
const UserForm = ({ handleSubmit, pristine }: Props) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="firstName"
      label="First Name"
      component={TextInput}
      validate={required}
      required
    />
    <Field
      name="lastName"
      label="Last Name"
      component={TextInput}
      validate={required}
      required
    />
    <Field
      name="phoneNumber"
      label="Phone Number"
      component={TextInput}
      validate={required}
      required
    />
    <Field
      name="foodPreferences"
      label="Food Preferences"
      component={TextArea}
    />
    <Button disabled={pristine} htmlType="submit">
      Submit
    </Button>
  </Form>
);

const mapStateToProps = state => ({
  formState: state.form.UserForm
});

const stateful = connect(mapStateToProps);

export default stateful(reduxForm({ form: 'user' })(UserForm));
