import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Form, Input, Icon } from 'antd';
import makeField from './helper';

const TextInput = makeField(Input);

const InviteForm = ({ handleSubmit }) => (
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

InviteForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  formState: state.form.InviteForm
});

const stateful = connect(mapStateToProps);

export default stateful(reduxForm({ form: 'invite' })(InviteForm));
