import React from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';

/**
 * Custom DatePicker that handles the conversion of the moment date value
 */
const MyDatePicker = ({ value, onChange, ...rest }) => (
  <DatePicker
    value={moment(value)}
    showTime
    format="YYYY-MM-DD HH:mm"
    onChange={date => onChange(date.toISOString())}
    {...rest}
  />
);

export default MyDatePicker;
