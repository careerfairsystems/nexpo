import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Input, Form, Icon, Upload } from 'antd';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 1 },
    sm: { span: 3 }
  },
  wrapperCol: {
    xs: { span: 26 },
    sm: { span: 6 }
  }
};
const makeField = Component => ({
  input,
  meta,
  children,
  hasFeedback,
  label,
  ...rest
}) => {
  const hasError = meta.touched && meta.invalid;
  return (
    <FormItem
      label={label}
      {...formItemLayout}
      validateStatus={hasError ? 'error' : 'success'}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <Component {...input} {...rest}>
        {children}
      </Component>
    </FormItem>
  );
};

const TextInput = makeField(Input);
// eslint disable-next-line
let UserForm = ({ handleSubmit, toggleEdit, disabled, reset }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="phone_number"
      label="Phone Number"
      component={TextInput}
      disabled={disabled}
    />
    <Field
      name="food_preferences"
      label="Food Preferences"
      component={TextInput}
      disabled={disabled}
    />
    <Button
      type="primary"
      onClick={() => {
        toggleEdit();
        if (!disabled) reset();
      }}
    >
      {disabled ? 'Edit' : 'Cancel'}
    </Button>
    <Button disabled={disabled} htmlType="submit">
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

UserForm = reduxForm({
  // a unique name for the form
  form: 'user'
})(UserForm);

UserForm = connect(state => ({
  formState: state.form.UserForm
}))(UserForm);

export default UserForm;
