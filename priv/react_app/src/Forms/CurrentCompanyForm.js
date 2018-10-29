import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { isNil } from 'lodash/fp';
import { Button, Form, Input } from 'antd';
import makeField, { required } from './helper';
import UploadButton from './UploadButton';

const TextInput = makeField(Input);
const TextArea = makeField(Input.TextArea);

type Props = {
  handleSubmit: () => Promise<void>,
  onCancel?: Event => any,
  submitting: boolean
};
const CurrentCompanyForm = ({ handleSubmit, onCancel, submitting }: Props) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="website"
      label="Website:"
      component={TextInput}
      validate={required}
      required
    />
    <Field
      name="description"
      label="Description:"
      component={TextArea}
      validate={required}
      required
    />
    <Field
      name="logoUrl"
      label="Logo"
      accept=".jpg,.jpeg,.gif,.png"
      component={UploadButton}
    />
    {onCancel && <Button onClick={onCancel}>Cancel</Button>}
    <Button disabled={submitting} htmlType="submit" type="primary">
      Submit
    </Button>
  </Form>
);

CurrentCompanyForm.defaultProps = {
  onCancel: null
};

const mapStateToProps = (state, props) => {
  const { initialValues = {} } = props;
  const { logoUrl: currentLogoUrl } = initialValues;

  let logoUrl = null;
  if (!isNil(currentLogoUrl))
    logoUrl = { uid: '-1', name: 'Logotype', url: currentLogoUrl };

  return {
    initialValues: { ...initialValues, logoUrl },
    formState: state.form.CurrentCompanyForm
  };
};

const stateful = connect(mapStateToProps);

export default stateful(
  reduxForm({ form: 'currentCompany' })(CurrentCompanyForm)
);
