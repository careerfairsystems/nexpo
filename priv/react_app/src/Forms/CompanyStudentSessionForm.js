import React from 'react';
import { Field, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Form, Select } from 'antd';
import makeField from './helper';

const FieldSelect = makeField(Select);

const CompanyStudentSessionForm = ({
  handleSubmit,
  submitting,
  options
}: FormProps) => (
  <Form onSubmit={handleSubmit} layout="inline">
    <Field
      name="studentId"
      component={FieldSelect}
      showSearch
      style={{ width: 200 }}
      filterOption={(inputValue, option) =>
        option.props.children
          .toUpperCase()
          .indexOf(inputValue.toUpperCase()) !== -1
      }
    >
      {options}
    </Field>
    <Button
      disabled={options.length === 0 || submitting}
      htmlType="submit"
      type="primary"
    >
      Assign
    </Button>
  </Form>
);

const mapStateToProps = (state, props) => ({
  formState: state.form[`CompanyStudentSession${props.id}`] || {},
  form: `CompanyStudentSession${props.id}`
});

const stateful = connect(mapStateToProps);

export default stateful(
  reduxForm({ enableReinitialize: true })(CompanyStudentSessionForm)
);
