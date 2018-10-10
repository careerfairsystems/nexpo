import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Input, Form } from 'antd';
import makeField from './helper';

const TextInput = makeField(Input);

const CurrentUserForm = ({ handleSubmit, pristine, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="phoneNumber"
      label="Phone Number"
      component={TextInput}
      type="number"
    />
    <Button disabled={pristine || submitting} htmlType="submit">
      Submit
    </Button>
  </Form>
);

CurrentUserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  formState: state.form.CurrentUserForm
});

const stateful = connect(mapStateToProps);

export default stateful(reduxForm({ form: 'currentUser' })(CurrentUserForm));
