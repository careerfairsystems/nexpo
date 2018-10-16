import React from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';

/**
 * Custom DatePicker that handles the conversion of the moment date value
 */
const MyDatePicker = ({ value, onChange, ...rest }) => (
  <DatePicker
    value={moment(value).isValid() ? moment.utc(value) : null}
    showTime
    format="YYYY-MM-DD HH:mm"
    onChange={date => (date ? onChange(date.toISOString()) : onChange(null))}
    {...rest}
  />
);

export default MyDatePicker;
