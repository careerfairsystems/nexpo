import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Form, Input, Radio } from 'antd';
import makeField from './helper';

const plainOptions = [
  { value: 0, label: 'No days' },
  { value: 1, label: 'First Day' },
  { value: 2, label: 'Second day' },
  { value: 3, label: 'Both day' }
];

const TextInput = makeField(Input);
const TextArea = makeField(Input.TextArea);
const RadioGroup = makeField(Radio.Group);

const CompanyForm = ({ handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Field name="company_name" label="Name:" component={TextInput} />
    <Field name="website" label="Website:" component={TextInput} />
    <Field name="description" label="Description:" component={TextArea} />
    <Field
      name="student_session_days"
      label="Student Session Days:"
      options={plainOptions}
      component={RadioGroup}
    />
    <Button htmlType="submit">Submit</Button>
  </Form>
);

CompanyForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  formState: state.form.CompanyForm
});

const stateful = connect(mapStateToProps);

export default stateful(reduxForm({ form: 'company' })(CompanyForm));
