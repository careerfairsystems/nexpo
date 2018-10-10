import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Form, Input, Radio } from 'antd';

import makeField from './helper';

const TextInput = makeField(Input);
const RadioGroup = makeField(Radio.Group);

const options = [
  { value: ['read_all'], label: 'read_all' },
  { value: ['write_all'], label: 'write_all' },
  { value: [''], label: 'no permissions' }
];

const RoleForm = ({ handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Field name="type" label="Name:" component={TextInput} />
    <Field
      name="permissions"
      label="Permissions:"
      component={RadioGroup}
      options={options}
    />
    <Button htmlType="submit">Submit</Button>
  </Form>
);

RoleForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  formState: state.form.RoleForm
});

const stateful = connect(mapStateToProps);

export default stateful(reduxForm({ form: 'role' })(RoleForm));
