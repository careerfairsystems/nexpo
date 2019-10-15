import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Checkbox, Form, Input } from 'antd';
import makeField, { required, validatePassword } from './helper';

const TextInput = makeField(Input);
const CheckBoxField = makeField(Checkbox);
const requiredGDPR = value =>
  value ? undefined : 'You must agree to be able to sign up';

const gdprText =
  'Teknologkåren vid LTH will treat your personal data according to our policy "for handling of member’s personal data" and guidelines for "GDPR" part 4.1. The information you provide us with when you register for Nexpo such as name, profile, resumés and personal letters may be disclosed to external parties to fulfill the purpose of the evenemang and may be saved by the external parties. You have full control of who you want to share this information with. The information is only shared with companies you make a student session application for and companies you allow to scan your profile during the fair. The information will be saved by us until you delete your Nexpo account but may still be available to external parties that has saved it beforehand.';

const agreeText =
  'I understand and agree that my personal data is saved as grounds for participating in ARKAD.';

const agreeText2 =
  'I agree that Teknologkåren vid LTH will treat my personal data provided by this application in connection with ARKAD.';

type Props = {
  handleSubmit: () => Promise<void>,
  submitting: boolean
};
const FinalizeSignupForm = ({ handleSubmit, submitting }: Props) => (
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
    <span style={{ whiteSpace: 'pre-wrap' }}>{gdprText}</span>
    <br />
    <br />
    <Field name="gdpr" component={CheckBoxField} validate={requiredGDPR}>
      {agreeText}
    </Field>
    <Field name="gdpr2" component={CheckBoxField} validate={requiredGDPR}>
      {agreeText2}
    </Field>
    <Button disabled={submitting} type="primary" htmlType="submit">
      Sign Up
    </Button>
  </Form>
);

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
