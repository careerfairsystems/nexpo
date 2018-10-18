import React from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Checkbox, Button } from 'antd';
import { Field } from 'redux-form';
import moment from 'moment';
import makeField, { required } from './helper';
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

const columns = [
  {
    title: 'Start Time',
    key: 'start',
    render: timeSlot => (
      <Field
        name={`${timeSlot}.start`}
        type="text"
        component={MyDatePicker}
        validate={required}
        required
      />
    )
  },
  {
    title: 'End Time',
    key: 'end',
    render: timeSlot => (
      <Field
        name={`${timeSlot}.end`}
        type="text"
        component={MyDatePicker}
        validate={required}
        required
      />
    )
  },
  {
    title: 'Location',
    key: 'location',
    render: timeSlot => (
      <Field
        name={`${timeSlot}.location`}
        type="text"
        component={TextInput}
        validate={required}
        required
      />
    )
  },
  {
    title: 'Action',
    key: 'action',
    render: timeSlot => (
      <>
        Delete:{' '}
        <Field
          name={`${timeSlot}.delete`}
          type="checkbox"
          component={FieldCheckbox}
        />
      </>
    )
  }
];

const DynamicTimeSlots = ({ fields, fieldValues }) => (
  <div className="student-session-time-slots">
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
    <Field name="location" type="text" component={TextInput} label="Location" />
    <br />
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
    <br />
    <Button
      type="secondary"
      onClick={() => generateTimeSlots(fields, fieldValues)}
    >
      Generate
    </Button>
    <br />
    <br />
    <Button type="primary" onClick={() => fields.push({})}>
      Add a row
    </Button>
    <br />
    <br />
    <Table
      size="small"
      dataSource={fields.map(i => i)}
      columns={columns}
      locale={{ emptyText: 'No Student Time Slots' }}
    />
  </div>
);

DynamicTimeSlots.propTypes = {
  fields: PropTypes.shape({
    map: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired
  }).isRequired,
  fieldValues: PropTypes.object.isRequired
};

export default DynamicTimeSlots;
