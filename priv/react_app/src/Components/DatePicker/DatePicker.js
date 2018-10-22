import React from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';

/**
 * Custom DatePicker that handles the conversion of the moment date value
 */
const MyDatePicker = ({ value, onChange, format = 'YYYY-MM-DD', ...rest }) => (
  <DatePicker
    value={moment(value, format).isValid() ? moment.utc(value, format) : null}
    format={format}
    onChange={date => (date ? onChange(date.toISOString()) : onChange(null))}
    {...rest}
  />
);

export default MyDatePicker;
