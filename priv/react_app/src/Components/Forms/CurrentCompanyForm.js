import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash/fp';
import { Button, Form, Input } from 'antd';
import makeField, { required } from './helper';
import UploadButton from './UploadButton';

const TextInput = makeField(Input);
const TextArea = makeField(Input.TextArea);

const CompanyForm = ({
  handleSubmit,
  onCancel,
  submitting,
  fileList,
  logoUrl
}) => (
  <Form onSubmit={handleSubmit}>
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
  fileList: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired,
  logoUrl: PropTypes.string,
  onCancel: PropTypes.func,
  submitting: PropTypes.bool.isRequired
};

const selector = formValueSelector('company'); // <-- same as form name
const mapStateToProps = state => {
  const logoUrl = selector(state, 'logoUrl');
  return {
    fileList: isEmpty(logoUrl) ? [] : [logoUrl],
    formState: state.form.CompanyForm
  };
};

const stateful = connect(mapStateToProps);

export default stateful(reduxForm({ form: 'company' })(CompanyForm));
