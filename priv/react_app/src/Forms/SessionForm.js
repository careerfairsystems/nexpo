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
const requiredCompany = value =>
  value ? undefined : 'Please provide a company';
const requiredMotivation = value =>
  value ? undefined : 'Please provide a motivation';

const StudentSessionForm = ({ handleSubmit, companies, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      label="Choose the company you would like to meet"
      required
      name="companyId"
      showSearch
      optionFilterProp="children"
      validate={requiredCompany}
      component={InputSelect}
    >
      {map(companyOption, companies)}
    </Field>
    <Field
      name="motivation"
      label="Write a short motivation to why you want to get in contact with the company. (Max 400 words)"
      required
      validate={requiredMotivation}
      component={TextArea}
      maxLength="2400"
      rows={6}
    />
    <Button disabled={submitting} htmlType="submit">
      Submit Student Session
    </Button>
  </Form>
);

StudentSessionForm.propTypes = {
  companies: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  formState: state.form.StudentSessionForm
});

const stateful = connect(mapStateToProps);

export default stateful(
  reduxForm({ form: 'studentSession' })(StudentSessionForm)
);
