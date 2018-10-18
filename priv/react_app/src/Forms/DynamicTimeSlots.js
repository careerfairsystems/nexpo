import React from 'react';
import PropTypes from 'prop-types';
import { Form, List, Input, Checkbox, Icon, Button } from 'antd';
import { Field } from 'redux-form';
import moment from 'moment';
import makeField from './helper';
import DatePicker from '../Components/DatePicker';

const TextInput = makeField(Input);
const FieldCheckbox = makeField(Checkbox);
const MyDatePicker = makeField(DatePicker);

const generateTimeSlots = (fields, values) => {
  const { startDate, endDate, timeslotLength, breakLength, location } = values;

  const startTime = moment.utc(startDate);
  const endTime = moment.utc(endDate);

  const totSessionTime = timeslotLength + breakLength;

  while (!startTime.isAfter(endTime)) {
    if (
      (startTime.isSameOrAfter(moment.utc(startTime).hours(12), 'hour') &&
        startTime.isBefore(moment.utc(startTime).hours(13), 'hour')) ||
      startTime.isBefore(moment.utc(startTime).hours(10), 'hour') ||
      startTime.isSameOrAfter(moment.utc(startTime).hours(16), 'hour')
    ) {
      startTime.add(1, 'hours');
    } else {
      fields.push({
        start: moment.utc(startTime),
        end: moment.utc(startTime).add(totSessionTime, 'minutes'),
        location
      });
      startTime.add(totSessionTime, 'minutes');
    }
  }
};

const renderTimeSlot = (timeSlot, index) => (
  <List.Item key={index}>
    <Field
      name={`${timeSlot}.start`}
      type="text"
      component={MyDatePicker}
      label="Start Time"
    />
    <Field
      name={`${timeSlot}.end`}
      type="text"
      component={MyDatePicker}
      label="End Time"
    />
    <Field
      name={`${timeSlot}.location`}
      type="text"
      component={TextInput}
      label="Location"
    />
    <Field
      name={`${timeSlot}.delete`}
      type="checkbox"
      component={FieldCheckbox}
      label="Delete"
    />
  </List.Item>
);

const DynamicTimeSlots = ({ fields, fieldValues, ...rest }) => (
  <Form.Item>
    <Field
      name="startDate"
      type="text"
      label="Sessions start date and time"
      component={MyDatePicker}
    />
    <Field
      name="endDate"
      type="text"
      label="Sessions end date and time"
      component={MyDatePicker}
    />
    <Field
      name="timeslotLength"
      type="number"
      defaultValue={20}
      component={TextInput}
      label="Timeslot length"
      addonAfter="minutes"
    />
    <Field
      name="breakLength"
      type="number"
      component={TextInput}
      label="Break length"
      addonAfter="minutes"
    />
    <Field name="location" type="text" component={TextInput} label="Location" />
    <Button
      onClick={() => generateTimeSlots(fields, fieldValues)}
      type="secondary"
    >
      Generate
    </Button>
    <List
      size="large"
      bordered
      locale={{ emptyText: 'No Student Time Slots' }}
      dataSource={fields.map(i => i)}
      renderItem={renderTimeSlot}
    />
    <Button type="dashed" onClick={() => fields.push({})}>
      <Icon type="plus" />
      Add Date
    </Button>
  </Form.Item>
);

DynamicTimeSlots.propTypes = {
  fields: PropTypes.shape({
    map: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired
  }).isRequired
};

export default DynamicTimeSlots;
