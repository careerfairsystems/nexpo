import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Input, Form, Button } from 'antd';
import makeField from './helper';

const TextArea = makeField(Input.TextArea);

const requiredMotivation = value =>
  value ? undefined : 'Please provide a motivation';

const UpdateSessionApplicationForm = ({ handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="motivation"
      required
      validate={requiredMotivation}
      component={TextArea}
      maxLength="2400"
      rows={6}
    />
    <Button type="primary" htmlType="submit">
      Update
    </Button>
  </Form>
);

UpdateSessionApplicationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  formState: state.form.UpdateSessionApplicationForm
});

const stateful = connect(mapStateToProps);

export default stateful(
  reduxForm({ form: 'updateStudentSessionApplication' })(
    UpdateSessionApplicationForm
  )
);
