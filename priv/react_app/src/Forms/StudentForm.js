import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { isNil, map } from 'lodash/fp';
import { Button, Form, Input, Select } from 'antd';

import makeField from './helper';
import UploadButton from './UploadButton';

const TextInput = makeField(Input);
const FieldSelect = makeField(Select);

const renderProgrammeItem = programme => (
  <Select.Option key={programme.id} value={programme.id}>
    {programme.code}
  </Select.Option>
);

type Props = {
  initialValues: {
    resumeEnUrl?: {
      name?: string,
      url?: string
    },
    resumeSvUrl: {
      name?: string,
      url?: string
    }
  },
  handleSubmit: () => Promise<any>,
  programmes: {},
  pristine: boolean
};
const StudentForm = ({ handleSubmit, pristine, programmes }: Props) => (
  <Form onSubmit={handleSubmit}>
    <Field name="year" label="Starting Year" component={TextInput} />
    <Field
      name="programme"
      label="Guild:"
      showSearch
      format={null}
      optionFilterProp="children"
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

const mapStateToProps = (state, props) => {
  const { initialValues = {} } = props;
  const {
    programme: currentProgramme,
    resumeSvUrl: currentResumeSvUrl,
    resumeEnUrl: currentResumeEnUrl
  } = initialValues;

  let programme = null;
  if (!isNil(currentProgramme)) programme = currentProgramme.id;

  let resumeSvUrl = null;
  if (!isNil(currentResumeSvUrl))
    resumeSvUrl = { uid: '-1', name: 'Swedish CV', url: currentResumeSvUrl };

  let resumeEnUrl = null;
  if (!isNil(currentResumeEnUrl))
    resumeEnUrl = { uid: '-1', name: 'English CV', url: currentResumeEnUrl };

  return {
    programmes: state.entities.programmes,
    initialValues: { ...initialValues, resumeSvUrl, resumeEnUrl, programme },
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
