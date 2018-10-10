import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Form, Input } from 'antd';
import DatePicker from '../DatePicker';

import makeField from './helper';

const TextInput = makeField(Input);
const MyDatePicker = makeField(DatePicker);

const DeadlineForm = ({ handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Field name="name" label="Name:" component={TextInput} />
    <Field name="start" label="Start Time:" component={MyDatePicker} />
    <Field name="end" label="End Time:" component={MyDatePicker} />
    <Button htmlType="submit">Submit</Button>
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
