import React from 'react';
import PropTypes from 'prop-types';
import { Form, List, Input, Button } from 'antd';
import { Field } from 'redux-form';
import makeField from './helper';
import DatePicker from '../Components/DatePicker';
import TimePicker from '../Components/TimePicker';

const TextInput = makeField(Input);
const MyTimePicker = makeField(TimePicker);
const MyDatePicker = makeField(DatePicker);

const renderGenerateForm = index => (
  <Form>
    <Field
      name="startdate"
      type="text"
      label="Sessions start date"
      component={MyDatePicker}
    />
    <Field
      name="enddate"
      type="text"
      label="Sessions end date"
      component={MyDatePicker}
    />
    <Field
      name="starttime"
      type="text"
      label="Timeslots start"
      component={MyTimePicker}
    />
    <Field
      name="endtime"
      type="text"
      label="Timeslots end"
      component={MyTimePicker}
    />

    <Field
      name="length"
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
    <Field name="location" type="text" component={TextInput} label="Location" />
    <Button type="secondary">Generate</Button>
  </Form>
);

const GenerateTimeSlotForm = () => renderGenerateForm();

GenerateTimeSlotForm.propTypes = {
  fields: PropTypes.shape({
    map: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired
  }).isRequired
};

export default GenerateTimeSlotForm;
