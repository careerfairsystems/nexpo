import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Input, Form } from 'antd';
import makeField from './helper';

const TextInput = makeField(Input);

const UserForm = ({ handleSubmit, toggleEdit, disabled, reset, pristine }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="phoneNumber"
      label="Phone Number"
      component={TextInput}
      disabled={disabled}
    />
    <Field
      name="foodPreferences"
      label="Food Preferences"
      component={TextInput}
      disabled={disabled}
    />
    <Button disabled={pristine} htmlType="submit">
      Submit
    </Button>
  </Form>
);

UserForm.defaultProps = {
  disabled: false
};

UserForm.propTypes = {
  disabled: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  formState: state.form.UserForm
});

const stateful = connect(mapStateToProps);

export default stateful(reduxForm({ form: 'user' })(UserForm));
