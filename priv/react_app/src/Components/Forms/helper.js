import React from 'react';
import { Form } from 'antd';

const FormItem = Form.Item;
export const validatePassword = values => {
  const errors = {};
  if (values && values.password && values.passwordConfirmation) {
    if (values.password !== values.passwordConfirmation) {
      errors.passwordConfirmation = 'Passwords Must Match';
    }
  }
  return errors;
};

const makeField = Component => ({
  input,
  meta,
  children,
  hasFeedback,
  label,
  required,
  ...rest
}) => {
  const hasError = meta.touched && meta.invalid;
  return (
    <FormItem
      label={label}
      required={required}
      validateStatus={hasError ? 'error' : 'success'}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <Component label={label} {...input} {...rest}>
        {children}
      </Component>
    </FormItem>
  );
};

// makeFormItem.propTypes = {
//   input: PropTypes.func.isRequired,
//   meta: PropTypes.func.isRequired,
//   label: PropTypes.string.isRequired
// };
export default makeField;
