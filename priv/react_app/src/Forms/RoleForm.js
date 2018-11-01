import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { map } from 'lodash/fp';
import { Button, Form, Input, Select } from 'antd';
import type { FormProps } from 'redux-form';

import makeField from './helper';

const TextInput = makeField(Input);
const FieldSelect = makeField(Select);

const permissions = [
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

const renderPermissionItem = permission => (
  <Select.Option key={permission}>{permission}</Select.Option>
);

const renderUserItem = user => (
  <Select.Option key={user.id} value={user.id}>
    {user.email}
  </Select.Option>
);

type Props = {
  ...FormProps,
  users: {},
  handleSubmit: () => Promise<void>
};
const RoleForm = ({ handleSubmit, users }: Props) => (
  <Form onSubmit={handleSubmit}>
    <Field name="type" label="Type:" component={TextInput} />
    <Field
      name="permissions"
      label="Permissions:"
      mode="multiple"
      format={null}
      component={FieldSelect}
    >
      {map(renderPermissionItem, permissions)}
    </Field>
    <Field
      name="users"
      label="Users:"
      mode="multiple"
      format={null}
      optionFilterProp="children"
      component={FieldSelect}
    >
      {map(renderUserItem, users)}
    </Field>
    <Button htmlType="submit">Submit</Button>
  </Form>
);

const mapStateToProps = state => ({
  users: state.entities.users,
  formState: state.form.RoleForm
});

const stateful = connect(mapStateToProps);

export default stateful(reduxForm({ form: 'role' })(RoleForm));
