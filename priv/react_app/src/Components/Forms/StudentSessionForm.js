import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash/fp';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Select, Input, Form, Button } from 'antd';
import makeField from './helper';

const InputSelect = makeField(Select);
const TextArea = makeField(Input.TextArea);

const { Option } = Select;

const companyOption = company => (
  <Option key={company.id} value={company.id}>
    {company.name}
  </Option>
);

const StudentSessionForm = ({ handleSubmit, disabled, companies }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Item
      label="Choose the company you would like to meet"
      required
      message="Please provide a company"
    >
      <Field name="companyId" component={InputSelect} style={{ width: 150 }}>
        {map(companyOption, companies)}
      </Field>
    </Form.Item>
    <Form.Item
      label="Write a short motivation to why you want to get in contact with the company"
      required
    >
      <Field name="motivation" component={TextArea} rows={6} />
    </Form.Item>
    <Button disabled={disabled} htmlType="submit">
      Submit Student Session
    </Button>
  </Form>
);

StudentSessionForm.defaultProps = {
  disabled: false
};

StudentSessionForm.propTypes = {
  disabled: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  companies: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  formState: state.form.StudentSessionForm
});

const stateful = connect(mapStateToProps);

export default stateful(reduxForm({ form: 'student' })(StudentSessionForm));
