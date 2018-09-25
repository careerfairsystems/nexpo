import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Input, Form, Icon, Upload } from 'antd';
import makeField from './helper';

const UploadButton = ({ beforeUpload, action }) => (
  <Upload action={action} beforeUpload={beforeUpload}>
    <Button>
      <Icon type="upload" /> Upload
    </Button>
  </Upload>
);

const TextInput = makeField(Input);
const Uploader = makeField(UploadButton);
// eslint disable-next-line
let StudentForm = ({
  handleSubmit,
  toggleEdit,
  disabled,
  reset,
  beforeUpload,
  action,
  curentStudent
}) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="resume_sv_url"
      label="Swedish CV"
      action={action}
      curentStudent={curentStudent}
      beforeUpload={beforeUpload}
      component={Uploader}
      disabled={disabled}
    />
    <Field
      name="resume_en_url"
      label="Enlgish Cv"
      beforeUpload={beforeUpload}
      component={Uploader}
      disabled={disabled}
    />
    <Button
      type="primary"
      onClick={() => {
        toggleEdit();
        if (!disabled) reset();
      }}
    >
      {disabled ? 'Edit' : 'Cancel'}
    </Button>
    <Button htmlType="submit">Submit</Button>
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
  form: 'user'
})(StudentForm);

StudentForm = connect(state => ({
  formState: state.form.StudentForm
}))(StudentForm);

export default StudentForm;
