import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { isNil } from 'lodash/fp';
import { Button, Form } from 'antd';
import UploadButton from './UploadButton';

const StudentForm = ({ handleSubmit, action, pristine, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="resumeSvUrl"
      label="Swedish CV"
      accept=".pdf"
      action={action}
      component={UploadButton}
    />
    <Field
      name="resumeEnUrl"
      label="English CV"
      accept=".pdf"
      action={action}
      component={UploadButton}
    />

    <Button disabled={pristine} loading={submitting} htmlType="submit">
      Save CV(s)
    </Button>
  </Form>
);

StudentForm.defaultProps = {
  action: ''
};

StudentForm.propTypes = {
  action: PropTypes.string,
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
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = (state, props) => {
  const {
    initialValues: {
      resumeSvUrl: currentResumeSvUrl,
      resumeEnUrl: currentResumeEnUrl
    }
  } = props;

  let resumeSvUrl = null;
  if (!isNil(currentResumeSvUrl))
    resumeSvUrl = { uid: '-1', name: 'Swedish CV', url: currentResumeSvUrl };

  let resumeEnUrl = null;
  if (!isNil(currentResumeEnUrl))
    resumeEnUrl = { uid: '-1', name: 'English CV', url: currentResumeEnUrl };

  return {
    initialValues: { ...props.initialValues, resumeSvUrl, resumeEnUrl },
    formState: state.form.StudentForm
  };
};

const stateful = connect(mapStateToProps);

export default stateful(reduxForm({ form: 'student' })(StudentForm));
