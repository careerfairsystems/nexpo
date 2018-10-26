import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Input, Form } from 'antd';
import makeField from './helper';

const TextInput = makeField(Input);

type Props = {
  handleSubmit: () => Promise<any>,
  pristine: boolean,
  submitting: boolean
};
const CurrentUserForm = ({ handleSubmit, pristine, submitting }: Props) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="phoneNumber"
      label="Phone Number"
      component={TextInput}
      type="number"
    />
    <Button disabled={pristine || submitting} htmlType="submit">
      Submit
    </Button>
  </Form>
);

const mapStateToProps = state => ({
  formState: state.form.CurrentUserForm
});

const stateful = connect(mapStateToProps);

export default stateful(reduxForm({ form: 'currentUser' })(CurrentUserForm));
