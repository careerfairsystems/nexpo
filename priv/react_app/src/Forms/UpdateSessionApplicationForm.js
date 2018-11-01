import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Input, Form, Button } from 'antd';
import makeField from './helper';

const TextArea = makeField(Input.TextArea);

const requiredMotivation = value =>
  value ? undefined : 'Please provide a motivation';

type Props = {
  handleSubmit: () => Promise<void>,
  invalid: boolean,
  pristine: boolean,
  submitting: boolean
};
const UpdateSessionApplicationForm = ({
  handleSubmit,
  invalid,
  pristine,
  submitting
}: Props) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="motivation"
      required
      validate={requiredMotivation}
      component={TextArea}
      maxLength="2400"
      rows={6}
    />
    <Button
      disabled={invalid || pristine || submitting}
      type="primary"
      htmlType="submit"
    >
      Update
    </Button>
  </Form>
);

const mapStateToProps = (state, props) => ({
  formState: state.form.UpdateSessionApplicationForm,
  form: `updateStudentSessionApplication${props.id}`
});

const stateful = connect(mapStateToProps);

export default stateful(reduxForm()(UpdateSessionApplicationForm));
