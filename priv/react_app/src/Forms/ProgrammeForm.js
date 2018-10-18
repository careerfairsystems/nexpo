import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Input, Form } from 'antd';
import makeField from './helper';

const TextInput = makeField(Input);

const ProgrammeForm = ({ handleSubmit, disabled, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="name"
      label="Guild Name"
      component={TextInput}
      disabled={disabled}
    />
    <Field name="code" label="Code" component={TextInput} disabled={disabled} />
    <Button disabled={disabled || submitting} htmlType="submit">
      Submit
    </Button>
  </Form>
);

ProgrammeForm.defaultProps = {
  disabled: false
};

ProgrammeForm.propTypes = {
  disabled: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  formState: state.form.ProgrammeForm
});

const stateful = connect(mapStateToProps);

export default stateful(reduxForm({ form: 'programme' })(ProgrammeForm));
