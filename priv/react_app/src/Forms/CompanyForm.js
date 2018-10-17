import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { isNil } from 'lodash/fp';
import { Button, Form, Input, TimePicker, DatePicker } from 'antd';
import moment from 'moment';
import makeField, { required } from './helper';
import UploadButton from './UploadButton';
import DynamicTimeSlots from './DynamicTimeSlots';

const format = 'HH:mm';
const dateFormat = 'YYYY/MM/DD';

const InputGroup = Input.Group;
const TextInput = makeField(Input);
const TextArea = makeField(Input.TextArea);

const CompanyForm = ({ handleSubmit, onCancel, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="name"
      label="Name"
      component={TextInput}
      validate={required}
      required
    />
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
    <h3>Student Session Time Slots</h3>
    <text>Student Session Days:</text>
    <div>
      <DatePicker
        defaultValue={moment('2018/11/14', dateFormat)}
        format={dateFormat}
      />
      <DatePicker
        defaultValue={moment('2018/11/15', dateFormat)}
        format={dateFormat}
      />
    </div>
    <text>Student Session Timeframe:</text>
    <div>
      <TimePicker
        name="starttime"
        defaultValue={moment('08:00', format)}
        format={format}
      />
      <TimePicker
        name="endtime"
        defaultValue={moment('16:00', format)}
        format={format}
      />
    </div>

    <InputGroup compact>
      <Field
        name="timeslot"
        type="text"
        component={TextInput}
        label="Timeslot length"
        addonAfter="minutes"
      />

      <Field
        name="break"
        type="text"
        component={TextInput}
        label="Break length"
        addonAfter="minutes"
      />
      <Field
        name="location"
        type="text"
        component={TextInput}
        label="Location"
      />
    </InputGroup>

    <Button type="secondary">Generate</Button>
    <FieldArray name="studentSessionTimeSlots" component={DynamicTimeSlots} />
    {onCancel && <Button onClick={onCancel}>Cancel</Button>}
    <Button disabled={submitting} htmlType="submit" type="primary">
      Submit
    </Button>
  </Form>
);

CompanyForm.defaultProps = {
  onCancel: null
};

CompanyForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = (state, props) => {
  const { initialValues = {} } = props;
  const { logoUrl: currentLogoUrl } = initialValues;

  let logoUrl = null;
  if (!isNil(currentLogoUrl))
    logoUrl = { uid: '-1', name: 'Logotype', url: currentLogoUrl };

  return {
    initialValues: { ...initialValues, logoUrl },
    formState: state.form.CompanyForm
  };
};

const stateful = connect(mapStateToProps);

export default stateful(reduxForm({ form: 'company' })(CompanyForm));
