import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Form } from 'antd';
import UploadButton from './UploadButton';

const StudentForm = ({
  handleSubmit,
  toggleEdit,
  disabled,
  reset,
  beforeUploadEn,
  beforeUpload,
  action,
  currentStudent,
  onRemove,
  fileList
}) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="resume_sv_url"
      label="Swedish CV"
      fileList={fileList.resume_sv_url}
      action={action}
      currentStudent={currentStudent}
      beforeUpload={beforeUpload}
      component={UploadButton}
      onRemove={onRemove}
    />
    <Field
      name="resume_en_url"
      label="English CV"
      fileList={fileList.resume_en_url}
      currentStudent={currentStudent}
      beforeUpload={beforeUpload}
      component={UploadButton}
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
  reset: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  formState: state.form.StudentForm
});

const stateful = connect(mapStateToProps);

export default stateful(reduxForm({ form: 'student' })(StudentForm));
