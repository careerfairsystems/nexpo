import React from 'react'
import Message from '../Message'

type Props = {
  message: string,
  linkUrl: string,
  linkText: string
}

/**
 * Higher order component for delivering an error message
 */
const ErrorMessage = (props: Props) => {
  return <Message type='error' {...props} />
}

export default ErrorMessage
