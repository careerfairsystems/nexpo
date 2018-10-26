import React from 'react';
import moment from 'moment';
import { TimePicker } from 'antd';

/**
 * Custom TimePicker that handles the conversion of the moment date value
 */
type Props = {
  value: any,
  onChange: any => void,
  format: string
};

const MyTimePicker = ({
  value,
  onChange,
  format = 'HH:mm',
  ...rest
}: Props) => (
  <TimePicker
    value={moment(value, format).isValid() ? moment.utc(value, format) : null}
    format={format}
    onChange={time => (time ? onChange(time.format(format)) : onChange(null))}
    minuteStep={5}
    {...rest}
  />
);

export default MyTimePicker;
