import React from 'react';
import { trim } from 'lodash/fp';
import { Form } from 'antd';

const FormItem = Form.Item;
type PasswordValues = {
  password?: string,
  passwordConfirmation?: string
};

export const validatePassword = (values: PasswordValues) => {
  const errors = {};
  if (values && values.password && values.passwordConfirmation) {
    if (values.password !== values.passwordConfirmation) {
      errors.passwordConfirmation = 'Passwords Must Match';
    }
  }
  return errors;
};
export const required = (value: string) =>
  trim(value) ? undefined : "Field can't be empty";

type Props = {
  children: Node,
  input: {},
  meta: {
    error: string,
    touched: boolean,
    invalid: boolean
  },
  label: string,
  hasFeedback: boolean,
  required: boolean
};
const makeField = Component => ({
  input,
  meta,
  children,
  hasFeedback,
  label,
  required,
  ...rest
}: Props) => {
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

export default makeField;
