import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Input, Form } from 'antd';
import makeField from './helper';

const TextInput = makeField(Input);

const CurrentUserForm = ({ handleSubmit, disabled, reset, pristine }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="phoneNumber"
      label="Phone Number"
      component={TextInput}
      type="number"
    />
    <Button disabled={pristine} htmlType="submit">
      Submit
    </Button>
  </Form>
);

CurrentUserForm.defaultProps = {
  disabled: true
};

CurrentUserForm.propTypes = {
  disabled: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  formState: state.form.CurrentUserForm
});

const stateful = connect(mapStateToProps);

export default stateful(reduxForm({ form: 'user' })(CurrentUserForm));
