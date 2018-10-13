import React from 'react';
import PropTypes from 'prop-types';
import { Form, List, Input, Checkbox, Icon, Button } from 'antd';
import { Field } from 'redux-form';
import makeField from './helper';
import DatePicker from '../DatePicker';

const TextInput = makeField(Input);
const FieldCheckbox = makeField(Checkbox);
const MyDatePicker = makeField(DatePicker);

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

const DynamicTimeSlots = ({ fields }) => (
  <Form.Item>
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
