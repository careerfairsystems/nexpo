import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Checkbox, Form, Input } from 'antd';
import makeField, { validatePassword } from './helper';

const TextInput = makeField(Input);
const CheckBoxField = makeField(Checkbox);
const required = value => (value ? undefined : "Field can't be empty");
const requiredGDPR = value =>
  value ? undefined : 'You must agree to be able to sign up';

const gdprText =
  'Teknologkåren vid LTH will treat your personal data according to our policy "for handling of member\'s personal data" and guidelines for "GDPR" part 4.1. Regarding personal data provided such as contact information and food preferences/allergies, this information will be saved by Teknologkåren vid LTH until the evenemang ARKAD has ended and may be disclosed to external parties to fulfill the purpose of the evenemang.\nUploaded documents such as resumés and personal letters will be disclosed to external parties to fulfill the purpose of the evenemang and may be saved by the external parties.\nI understand and agrees that my personal data is saved as grounds for participating in the Student Session.';

const agreeText =
  'I agree that Teknologkåren vid LTH will treat my personal data provided by this application in connection with the Student Session.';

const FinalizeSignupForm = ({ handleSubmit }) => (
  <Form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
    <Field
      name="email"
      label="Email"
      component={TextInput}
      disabled
      validate={required}
    />
    <Field
      name="password"
      label="Password"
      type="password"
      component={TextInput}
      validate={required}
    />
    <Field
      name="passwordConfirmation"
      label="Password Confirmation"
      type="password"
      component={TextInput}
      validate={required}
    />
    <Field
      name="firstName"
      label="First Name"
      component={TextInput}
      validate={required}
    />
    <Field
      name="lastName"
      label="Last Name"
      component={TextInput}
      validate={required}
    />
    <Field
      type="number"
      name="phoneNumber"
      label="Phone Number"
      component={TextInput}
    />
    {<span style={{ whiteSpace: 'pre-wrap' }}>{gdprText}</span>}
    <Field name="gdpr" component={CheckBoxField} validate={requiredGDPR}>
      {agreeText}
    </Field>
    <Button type="primary" htmlType="submit">
      Sign up
    </Button>
  </Form>
);

FinalizeSignupForm.defaultProps = {};

FinalizeSignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  formState: state.form.FinalizeSignupForm
});

const stateful = connect(mapStateToProps);

export default stateful(
  reduxForm({
    form: 'finalizeSignup',
    validate: validatePassword,
    enableReinitialize: true
  })(FinalizeSignupForm)
);
