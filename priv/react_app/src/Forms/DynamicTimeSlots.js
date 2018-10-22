import React from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Checkbox, Button } from 'antd';
import { Field } from 'redux-form';
import moment from 'moment';
import makeField, { required } from './helper';
import DatePicker from '../Components/DatePicker';
import TimePicker from '../Components/TimePicker';

const TextInput = makeField(Input);
const FieldCheckbox = makeField(Checkbox);
const MyDatePicker = makeField(DatePicker);
const MyTimePicker = makeField(TimePicker);

const generateTimeSlots = (fields, values) => {
  const {
    date,
    startTime,
    endTime,
    timeslotLength,
    breakLength,
    location
  } = values;
  if (!date || !startTime || !endTime) return;

  const current = moment.utc(`${date} ${startTime}`, 'YYYY-MM-DD HH:mm');
  const end = moment.utc(`${date} ${endTime}`, 'YYYY-MM-DD HH:mm');
  const lunchStart = moment.utc(`${date} 12:00`, 'YYYY-MM-DD HH:mm');
  const lunchEnd = moment.utc(`${date} 13:00`, 'YYYY-MM-DD HH:mm');
  const sessionLength = timeslotLength + breakLength;

  while (current.isBefore(end)) {
    if (current.isBetween(lunchStart, lunchEnd, null, '[)')) {
      current.hours(13);
    } else {
      fields.push({
        start: moment.utc(current),
        end: moment.utc(current).add(sessionLength, 'minutes'),
        location
      });
      current.add(sessionLength, 'minutes');
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
        showTime
        props={{ format: 'YYYY-MM-DD HH:mm' }}
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
        showTime
        props={{ format: 'YYYY-MM-DD HH:mm' }}
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
    render: (timeSlot, ...rest) => (
      <>
        {console.log(timeSlot, rest)}
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
    <Field name="date" label="Date" component={MyDatePicker} />
    <Field name="startTime" label="Start Time" component={MyTimePicker} />
    <Field name="endTime" label="End Time" component={MyTimePicker} />
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
      dataSource={fields.map(field => field)}
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
  fieldValues: PropTypes.object
};

DynamicTimeSlots.defaultProps = {
  fieldValues: {}
};

export default DynamicTimeSlots;
