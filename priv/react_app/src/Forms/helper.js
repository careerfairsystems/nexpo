import * as React from 'react';
import type { FieldProps } from 'redux-form';
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
  ...FieldProps,
  accept: string,
  children: Node,
  format: string,
  label: string
};
const makeField = (Component: React.ComponentType<*>) => ({
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
