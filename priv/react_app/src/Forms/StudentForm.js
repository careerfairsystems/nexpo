import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { isNil, map } from 'lodash/fp';
import { Button, Form, Input, Select } from 'antd';

import makeField from './helper';
import UploadButton from './UploadButton';

const TextInput = makeField(Input);
const FieldSelect = makeField(Select);

const interestsValues = [
  { id: 1, name: 'Foreign Opportunity' },
  { id: 2, name: 'Internship' },
  { id: 3, name: 'Part-time job' },
  { id: 4, name: 'Summer job' },
  { id: 5, name: 'Thesis' },
  { id: 6, name: 'Trainee employment' },
  { id: 7, name: 'Full-time job' }
];

const renderInterestItem = interest => (
  <Select.Option key={interest.id} value={interest.id}>
    {interest.name}
  </Select.Option>
);

const renderProgrammeItem = programme => (
  <Select.Option key={programme.id} value={programme.id}>
    {programme.name} - {programme.code}
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
  handleSubmit: () => Promise<void>,
  programmes: {},
  pristine: boolean
};

const StudentForm = ({ handleSubmit, pristine, programmes }: Props) => (
  <Form onSubmit={handleSubmit}>
    <Field name="year" label="Graduation Year" component={TextInput} />
    <Field
      name="programme"
      label="Educational programme:"
      showSearch
      format={null}
      optionFilterProp="children"
      component={FieldSelect}
    >
      {map(renderProgrammeItem, programmes)}
    </Field>
    <Field
      name="interests"
      label="Interests:"
      mode="multiple"
      format={null}
      optionFilterProp="children"
      component={FieldSelect}
    >
      {map(renderInterestItem, interestsValues)}
    </Field>
    <Field
      name="master"
      label="Master's specialization:"
      component={TextInput}
    />
    <Field name="linkedIn" label="LinkedIn URL:" component={TextInput} />
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
      Submit Student Information
    </Button>
  </Form>
);

const mapStateToProps = (state, props) => {
  const { initialValues = {} } = props;
  const {
    programme: currentProgramme,
    interests: currentInterests,
    resumeSvUrl: currentResumeSvUrl,
    resumeEnUrl: currentResumeEnUrl
  } = initialValues;

  let programme = null;
  if (!isNil(currentProgramme)) programme = currentProgramme.id;

  let interests = null;
  if (!isNil(currentInterests)) interests = currentInterests.map(v => v.id);

  let resumeSvUrl = null;
  if (!isNil(currentResumeSvUrl))
    resumeSvUrl = { uid: '-1', name: 'Swedish CV', url: currentResumeSvUrl };

  let resumeEnUrl = null;
  if (!isNil(currentResumeEnUrl))
    resumeEnUrl = { uid: '-1', name: 'English CV', url: currentResumeEnUrl };

  return {
    programmes: state.entities.programmes,
    initialValues: {
      ...initialValues,
      resumeSvUrl,
      resumeEnUrl,
      programme,
      interests
    },
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
