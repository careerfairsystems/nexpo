import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Form } from 'antd';
import UploadButton from './UploadButton';

const StudentForm = ({
  handleSubmit,
  disabled,
  beforeUpload,
  action,
  currentStudent,
  onRemove,
  fileList
}) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="resumeSvUrl"
      label="Swedish CV"
      fileList={fileList.resumeSvUrl}
      action={action}
      currentStudent={currentStudent}
      beforeUpload={beforeUpload}
      component={UploadButton}
      accept=".pdf"
      onRemove={onRemove}
    />
    <Field
      name="resumeEnUrl"
      label="English CV"
      fileList={fileList.resumeEnUrl}
      currentStudent={currentStudent}
      beforeUpload={beforeUpload}
      component={UploadButton}
      accept=".pdf"
      onRemove={onRemove}
    />

    <Button disabled={disabled} htmlType="submit">
      Save CV
    </Button>
  </Form>
);

StudentForm.defaultProps = {
  disabled: false
};

StudentForm.propTypes = {
  disabled: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  formState: state.form.StudentForm
});

const stateful = connect(mapStateToProps);

export default stateful(reduxForm({ form: 'student' })(StudentForm));
