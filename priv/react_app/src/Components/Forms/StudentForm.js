import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { isEmpty } from 'lodash/fp';
import { connect } from 'react-redux';
import { Button, Form } from 'antd';
import { Actions } from '../../Store';
import UploadButton from './UploadButton';

const StudentForm = ({
  handleSubmit,
  action,
  currentStudent,
  pristine,
  submitting,
  fileListEn,
  fileListSv,
  updateCurrentStudent
}) => {
  const destroyCv = cv => updateCurrentStudent({ student: { [cv]: null } });
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="resumeSvUrl"
        label="Swedish CV"
        destroyFile={destroyCv}
        action={action}
        fileList={fileListSv}
        currentValue={currentStudent.resumeSvUrl}
        currentValueText="Current CV"
        component={UploadButton}
        accept=".pdf"
      />
      <Field
        name="resumeEnUrl"
        label="English CV"
        destroyFile={destroyCv}
        fileList={fileListEn}
        currentValue={currentStudent.resumeEnUrl}
        currentValueText="Current CV"
        component={UploadButton}
        accept=".pdf"
      />

      <Button disabled={pristine} loading={submitting} htmlType="submit">
        Save CV(s)
      </Button>
    </Form>
  );
};

StudentForm.defaultProps = {
  action: '',
  fileListEn: [],
  fileListSv: []
};

StudentForm.propTypes = {
  action: PropTypes.string,
  currentStudent: PropTypes.shape({
    resumeEnUrl: PropTypes.string,
    resumeSvUrl: PropTypes.string
  }).isRequired,
  fileListEn: PropTypes.array,
  fileListSv: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  updateCurrentStudent: PropTypes.func.isRequired
};

const selector = formValueSelector('student'); // <-- same as form name
const mapStateToProps = state => {
  const fileListSv = selector(state, 'resumeSvUrl');
  const fileListEn = selector(state, 'resumeEnUrl');
  return {
    fileListSv: isEmpty(fileListSv) ? [] : [fileListSv],
    fileListEn: isEmpty(fileListEn) ? [] : [fileListEn],
    formState: state.form.StudentForm
  };
};

const mapDispatchToProps = {
  updateCurrentStudent: Actions.users.updateCurrentStudent
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(reduxForm({ form: 'student' })(StudentForm));
