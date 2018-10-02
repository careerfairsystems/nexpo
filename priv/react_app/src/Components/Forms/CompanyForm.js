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

const CompanyForm = ({
  handleSubmit,
  logoUrl,
  beforeUpload,
  onRemove,
  onCancel
}) => (
  <Form onSubmit={handleSubmit}>
    <Field name="name" label="Name:" component={TextInput} />
    <Field
      name="logoUrl"
      label="Logo"
      fileList={logoUrl ? [logoUrl] : []}
      currentStudent={{}}
      beforeUpload={beforeUpload}
      component={UploadButton}
      onRemove={onRemove}
    />
    <Field name="website" label="Website:" component={TextInput} />
    <Field name="description" label="Description:" component={TextArea} />
    <Field
      name="studentSessionDays"
      label="Student Session Days:"
      options={plainOptions}
      component={RadioGroup}
    />
    <Button onClick={onCancel}>Cancel</Button>
    <Button htmlType="submit" type="primary">
      Submit
    </Button>
  </Form>
);

CompanyForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  formState: state.form.CompanyForm
});

const stateful = connect(mapStateToProps);

export default stateful(reduxForm({ form: 'company' })(CompanyForm));
