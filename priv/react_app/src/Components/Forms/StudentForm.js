import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash/fp';
import { Button, Form, Icon, Upload } from 'antd';
import makeField from './helper';

const UploadButton = ({
  beforeUpload,
  action,
  currentStudent,
  name,
  onRemove,
  fileList
}) => (
  <Upload
    action={action}
    beforeUpload={file => beforeUpload(file, name)}
    onRemove={() => onRemove(name)}
    fileList={fileList}
  >
    <Button>
      <Icon type="upload" /> Upload
    </Button>
    {!isEmpty(currentStudent[name]) && (
      <Icon
        style={{ color: 'green', fontSize: 20 }}
        type="check"
        theme="outlined"
      />
    )}
  </Upload>
);
const Uploader = makeField(UploadButton);
let StudentForm = ({
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
      component={Uploader}
      onRemove={onRemove}
    />
    <Field
      name="resume_en_url"
      label="English CV"
      fileList={fileList.resume_en_url}
      currentStudent={currentStudent}
      beforeUpload={beforeUpload}
      component={Uploader}
      onRemove={onRemove}
    />

    <Button disabled={disabled} htmlType="submit">
      Submit
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

StudentForm = reduxForm({
  // a unique name for the form
  form: 'student'
})(StudentForm);

StudentForm = connect(state => ({
  formState: state.form.StudentForm
}))(StudentForm);

export default StudentForm;
