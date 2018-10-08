import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Form, Input, DatePicker } from 'antd';
import makeField from './helper';

const TextInput = makeField(Input);
const DatePick = makeField(DatePicker);

const DeadlineForm = ({ handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Field name="name" label="Name:" component={TextInput} />
    <Field name="start" label="Start Date:" showTime component={DatePick} />
    <Field name="end" label="End Date:" showTime component={DatePick} />
    <Button htmlType="submit">Create deadline</Button>
  </Form>
);

DeadlineForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  formState: state.form.DeadlineForm
});

const stateful = connect(mapStateToProps);

export default stateful(reduxForm({ form: 'deadline' })(DeadlineForm));
