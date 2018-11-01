import React from 'react';
import Message from '../Message';

type Props = {
  message: string,
  linkUrl?: string,
  linkText?: string
};

/**
 * Higher order component for delivering a successful message
 */
const SuccessMessage = (props: Props) => <Message type="success" {...props} />;

SuccessMessage.defaultProps = {
  linkUrl: '',
  linkText: ''
};

export default SuccessMessage;
