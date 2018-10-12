import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { map } from 'lodash/fp';
import { Button, Form, Input, Select } from 'antd';

import makeField from './helper';

const TextInput = makeField(Input);
const FieldSelect = makeField(Select);

const perms = [
  'read_all',
  'write_all',
  'read_users',
  'write_users',
  'read_roles',
  'write_roles',
  'read_events',
  'write_events',
  'read_companies',
  'write_companies',
  'read_categories',
  'write_categories',
  'read_sessions',
  'write_sessions',
  'read_hosts',
  'write_hosts'
];

const RoleForm = ({ handleSubmit, users }) => (
  <Form onSubmit={handleSubmit}>
    <Field name="type" label="Type:" component={TextInput} />
    <Field
      name="permissions"
      label="Permissions:"
      mode="multiple"
      format={null}
      component={FieldSelect}
    >
      {perms.map(permission => (
        <Select.Option key={permission}>{permission}</Select.Option>
      ))}
    </Field>
    <Field
      name="users"
      label="Users:"
      mode="multiple"
      format={null}
      component={FieldSelect}
    >
      {map(
        ({ id, email }) => (
          <Select.Option key={id} value={id}>
            {email}
          </Select.Option>
        ),
        users
      )}
    </Field>
    <Button htmlType="submit">Submit</Button>
  </Form>
);

RoleForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  users: state.entities.users,
  formState: state.form.RoleForm
});

const stateful = connect(mapStateToProps);

export default stateful(reduxForm({ form: 'role' })(RoleForm));
