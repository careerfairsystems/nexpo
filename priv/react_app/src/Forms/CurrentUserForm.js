import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { isNil } from 'lodash/fp';
import { Button, Input, Form } from 'antd';
import makeField from './helper';
import UploadButton from './UploadButton';

const TextInput = makeField(Input);

type Props = {
  handleSubmit: () => Promise<void>,
  pristine: boolean,
  submitting: boolean
};
const CurrentUserForm = ({ handleSubmit, pristine, submitting }: Props) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="phoneNumber"
      label="Phone Number"
      component={TextInput}
      type="number"
    />
    <Field
      name="profileImage"
      label="Profile Image"
      accept=".jpg,.jpeg,.gif,.png"
      component={UploadButton}
    />
    <Button disabled={pristine || submitting} htmlType="submit">
      Submit User Information
    </Button>
  </Form>
);

const mapStateToProps = (state, props) => {
  const { initialValues = {} } = props;
  const { profileImage: currentProfileImage } = initialValues;

  let profileImage = null;
  if (!isNil(currentProfileImage))
    profileImage = {
      uid: '-1',
      name: 'profileImage',
      url: currentProfileImage
    };

  return {
    initialValues: { ...initialValues, profileImage },
    formState: state.form.CurrentCompanyForm
  };
};

const stateful = connect(mapStateToProps);

export default stateful(reduxForm({ form: 'currentUser' })(CurrentUserForm));
