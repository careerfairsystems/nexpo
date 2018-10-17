import React from 'react';
import moment from 'moment';
import { TimePicker } from 'antd';

/**
 * Custom DatePicker that handles the conversion of the moment date value
 */
const MyTimePicker = ({ value, onChange, ...rest }) => (
  <TimePicker
    value={moment(value).isValid() ? moment.utc(value) : null}
    showTime
    defaultValue={moment('2018/11/14', 'HH:mm')}
    format="HH:mm"
    onChange={date => (date ? onChange(date.toISOString()) : onChange(null))}
    {...rest}
  />
);

export default MyTimePicker;
