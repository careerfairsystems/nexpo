import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Form, Input, Radio } from 'antd';
import makeField from './helper';
import UploadButton from './UploadButton';

const plainOptions = [
  { value: 0, label: 'No days' },
  { value: 1, label: 'First day' },
  { value: 2, label: 'Second day' },
  { value: 3, label: 'Both days' }
];

const TextInput = makeField(Input);
const TextArea = makeField(Input.TextArea);
const RadioGroup = makeField(Radio.Group);
const required = value => (value ? undefined : "Field can't be empty");

const CompanyForm = ({
  handleSubmit,
  logoUrl,
  beforeUpload,
  onRemove,
  onCancel,
  submitting
}) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="name"
      label="Name"
      component={TextInput}
      validate={required}
      required
    />
    <Field
      name="website"
      label="Website:"
      component={TextInput}
      validate={required}
      required
    />
    <Field
      name="description"
      label="Description:"
      component={TextArea}
      validate={required}
      required
    />
    <Field
      name="studentSessionDays"
      label="Student Session Days:"
      options={plainOptions}
      component={RadioGroup}
    />
    <Field
      name="logoUrl"
      label="Logo"
      fileList={logoUrl ? [logoUrl] : []}
      currentStudent={{}}
      beforeUpload={beforeUpload}
      component={UploadButton}
      accept="image/*"
      onRemove={onRemove}
    />
    <Button onClick={onCancel}>Cancel</Button>
    <Button disabled={submitting} htmlType="submit" type="primary">
      Submit
    </Button>
  </Form>
);

CompanyForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  formState: state.form.CompanyForm
});

const stateful = connect(mapStateToProps);

export default stateful(reduxForm({ form: 'company' })(CompanyForm));
