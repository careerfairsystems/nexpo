import React from 'react';
import Message from '../Message';

type Props = {
  message: string,
  linkUrl?: string,
  linkText?: string
};

/**
 * Higher order component for delivering an error message
 */
const ErrorMessage = (props: Props) => <Message type="error" {...props} />;

ErrorMessage.defaultProps = { linkUrl: '', linkText: '' };
export default ErrorMessage;
