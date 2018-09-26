import React from 'react';
import { Form } from 'antd';

const FormItem = Form.Item;

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
