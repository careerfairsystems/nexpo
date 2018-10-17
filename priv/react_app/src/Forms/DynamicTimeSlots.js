import React from 'react';
import PropTypes from 'prop-types';
import { Form, List, Input, Checkbox, Icon, Button } from 'antd';
import { Field } from 'redux-form';
import moment from 'moment';
import makeField from './helper';
import DatePicker from '../Components/DatePicker';
import TimePicker from '../Components/TimePicker';

const TextInput = makeField(Input);
const FieldCheckbox = makeField(Checkbox);
const MyDatePicker = makeField(DatePicker);

const MyTimePicker = makeField(TimePicker);
const generateTimeSlots = (fields, values) => {
  const {
    starttime,
    startdate,
    endtime,
    enddate,
    timeslotLength = 10,
    breakLength = 5,
    location
  } = values;

  const startTimeString = moment.utc(starttime).format('HH:mm');
  const startTime =
    moment.utc(startdate).format('YYYY-MM-DD ') + startTimeString;

  const endTime =
    moment.utc(startdate).format('YYYY-MM-DD ') +
    moment.utc(endtime).format('HH:mm'); // .format('HH:mm');

  let start = `${moment
    .utc(startdate)
    .format('YYYY-MM-DD')} ${startTimeString}`;
  let end = moment
    .utc(start)
    .add(parseInt(timeslotLength, 10) + parseInt(breakLength, 10), 'minutes');

  // const current = start;
  const current = moment.utc(startTime);

  while (current.isBefore(endTime)) {
    // currentString = moment.utc(starttime).format('HH:mm');
    start = current.format('YYYY-MM-DD HH:mm');
    end = moment
      .utc(start)
      .add(parseInt(timeslotLength, 10) + parseInt(breakLength, 10), 'minutes');

    fields.push({
      start,
      end
    });
    current.add(
      parseInt(timeslotLength, 10) + parseInt(breakLength, 10),
      'minutes'
    );
  }
  fields.push({
    start,
    end
  });
  return { start: 'Lul', end: 'Lul', location };
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
