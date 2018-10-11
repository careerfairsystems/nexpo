import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { isNil } from 'lodash/fp';
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

const CompanyForm = ({ action, handleSubmit, onCancel, submitting }) => (
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
      accept="image/*"
      action={action}
      component={UploadButton}
    />
    {onCancel && <Button onClick={onCancel}>Cancel</Button>}
    <Button disabled={submitting} htmlType="submit" type="primary">
      Submit
    </Button>
  </Form>
);

CompanyForm.defaultProps = {
  action: '',
  onCancel: null
};

CompanyForm.propTypes = {
  action: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = (state, props) => {
  const { initialValues = {} } = props;
  const { logoUrl: currentLogoUrl } = initialValues;

  let logoUrl = null;
  if (!isNil(currentLogoUrl))
    logoUrl = { uid: '-1', name: 'Logotype', url: currentLogoUrl };

  return {
    initialValues: { ...initialValues, logoUrl },
    formState: state.form.CompanyForm
  };
};

const stateful = connect(mapStateToProps);

export default stateful(reduxForm({ form: 'company' })(CompanyForm));
