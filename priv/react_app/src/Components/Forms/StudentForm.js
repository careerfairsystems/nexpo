import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Form } from 'antd';
import { Actions } from '../../Store';
import UploadButton from './UploadButton';

const StudentForm = ({
  handleSubmit,
  disabled,
  beforeUpload,
  action,
  currentStudent,
  onRemove,
  fileList,
  updateCurrentStudent,
  submitting
}) => {
  const destroyCv = cv => updateCurrentStudent({ student: { [cv]: null } });
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="resumeSvUrl"
        label="Swedish CV"
        fileList={fileList.resumeSvUrl ? [fileList.resumeSvUrl] : []}
        action={action}
        currentStudent={currentStudent}
        beforeUpload={beforeUpload}
        component={UploadButton}
        accept=".pdf"
        destroyCv={destroyCv}
        onRemove={onRemove}
      />
      <Field
        name="resumeEnUrl"
        label="English CV"
        fileList={fileList.resumeEnUrl ? [fileList.resumeEnUrl] : []}
        currentStudent={currentStudent}
        beforeUpload={beforeUpload}
        component={UploadButton}
        destroyCv={destroyCv}
        accept=".pdf"
        onRemove={onRemove}
      />

      <Button disabled={disabled || submitting} htmlType="submit">
        Save CV(s)
      </Button>
    </Form>
  );
};

StudentForm.defaultProps = {
  disabled: false
};

StudentForm.propTypes = {
  disabled: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  formState: state.form.StudentForm
});

const mapDispatchToProps = {
  updateCurrentStudent: Actions.users.updateCurrentStudent
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(reduxForm({ form: 'student' })(StudentForm));
