import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { isNil, map } from 'lodash/fp';
import { Button, Form, Input, Select } from 'antd';

import makeField, { required } from './helper';
import UploadButton from './UploadButton';

const TextInput = makeField(Input);
const FieldSelect = makeField(Select);

const renderProgrammeItem = programme => (
  <Select.Option key={programme.code}>{programme.code}</Select.Option>
);

const StudentForm = ({ handleSubmit, pristine, programmes }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="year"
      label="Starting Year"
      component={TextInput}
      validate={required}
      required
    />
    <Field
      name="programme"
      label="Programme:"
      showSearch
      component={FieldSelect}
    >
      {map(renderProgrammeItem, programmes)}
    </Field>
    <Field
      name="resumeSvUrl"
      label="Swedish CV"
      accept=".pdf"
      component={UploadButton}
    />
    <Field
      name="resumeEnUrl"
      label="English CV"
      accept=".pdf"
      component={UploadButton}
    />

    <Button disabled={pristine} htmlType="submit">
      Submit Student Info
    </Button>
  </Form>
);

StudentForm.propTypes = {
  initialValues: PropTypes.shape({
    resumeEnUrl: PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string
    }),
    resumeSvUrl: PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string
    })
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  programmes: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired
};

const mapStateToProps = (state, props) => {
  const { initialValues = {} } = props;
  const {
    resumeSvUrl: currentResumeSvUrl,
    resumeEnUrl: currentResumeEnUrl
  } = initialValues;

  let resumeSvUrl = null;
  if (!isNil(currentResumeSvUrl))
    resumeSvUrl = { uid: '-1', name: 'Swedish CV', url: currentResumeSvUrl };

  let resumeEnUrl = null;
  if (!isNil(currentResumeEnUrl))
    resumeEnUrl = { uid: '-1', name: 'English CV', url: currentResumeEnUrl };

  return {
    programmes: state.entities.programmes,
    initialValues: { ...initialValues, resumeSvUrl, resumeEnUrl },
    formState: state.form.StudentForm
  };
};

const stateful = connect(mapStateToProps);

export default stateful(
  reduxForm({
    form: 'student',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
  })(StudentForm)
);
