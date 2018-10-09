import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash/fp';
import { Button, Form, Input, Radio } from 'antd';
import makeField, { required } from './helper';
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
  onCancel,
  submitting,
  fileList,
  logoUrl
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
      fileList={fileList}
      currentValue={logoUrl}
      currentValueText="Current Logo"
      component={UploadButton}
      accept="image/*"
    />
    {onCancel && <Button onClick={onCancel}>Cancel</Button>}
    <Button disabled={submitting} htmlType="submit" type="primary">
      Submit
    </Button>
  </Form>
);

CompanyForm.defaultProps = {
  fileList: [],
  logoUrl: '',
  onCancel: null
};

CompanyForm.propTypes = {
  fileList: PropTypes.arrayOf(PropTypes.shape(PropTypes.string)),
  handleSubmit: PropTypes.func.isRequired,
  logoUrl: PropTypes.string,
  onCancel: PropTypes.func,
  submitting: PropTypes.bool.isRequired
};

const selector = formValueSelector('company'); // <-- same as form name
const mapStateToProps = state => {
  let logoUrl = selector(state, 'logoUrl');
  logoUrl = isEmpty(logoUrl) ? [] : [logoUrl];
  return {
    fileList: logoUrl,
    formState: state.form.CompanyForm
  };
};

const stateful = connect(mapStateToProps);

export default stateful(reduxForm({ form: 'company' })(CompanyForm));
