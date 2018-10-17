import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { isNil } from 'lodash/fp';
import { Button, Form, Input } from 'antd';
import makeField, { required } from './helper';
import UploadButton from './UploadButton';
import DynamicTimeSlots from './DynamicTimeSlots';

const TextInput = makeField(Input);
const TextArea = makeField(Input.TextArea);

const CompanyForm = ({ handleSubmit, onCancel, submitting, formState }) => (
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
      name="logoUrl"
      label="Logo"
      accept=".jpg,.jpeg,.gif,.png"
      component={UploadButton}
    />
    <h3>Student Session Time Slots</h3>
    <FieldArray
      name="studentSessionTimeSlots"
      component={DynamicTimeSlots}
      fieldValues={formState.values}
    />
    {onCancel && <Button onClick={onCancel}>Cancel</Button>}
    <Button disabled={submitting} htmlType="submit" type="primary">
      Submit
    </Button>
  </Form>
);

CompanyForm.defaultProps = {
  onCancel: null
};

CompanyForm.propTypes = {
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
    initialValues: {
      ...initialValues,
      timeslotLength: 20,
      breakLength: 10,
      logoUrl
    },
    formState: state.form.company || {}
  };
};

const stateful = connect(mapStateToProps);

export default stateful(reduxForm({ form: 'company' })(CompanyForm));
