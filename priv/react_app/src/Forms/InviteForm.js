import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Form, Input, Icon } from 'antd';
import makeField from './helper';

const TextInput = makeField(Input);

type Props = {
  handleSubmit: () => Promise<void>
};
const InviteForm = ({ handleSubmit }: Props) => (
  <Form onSubmit={handleSubmit} layout="inline">
    <Field
      name="email"
      label="Email:"
      component={TextInput}
      prefix={<Icon type="mail" />}
      placeholder="Email"
    />
    <Button htmlType="submit">Invite</Button>
  </Form>
);

const mapStateToProps = state => ({
  formState: state.form.InviteForm
});

const stateful = connect(mapStateToProps);

export default stateful(reduxForm({ form: 'invite' })(InviteForm));
