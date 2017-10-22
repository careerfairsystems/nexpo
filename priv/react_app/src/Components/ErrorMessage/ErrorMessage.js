import React from 'react'
import Message from '../Message'

/**
 * Higher order component for delivering an error message
 */
const ErrorMessage = (props) => {
  return <Message type='error' {...props} />
}

export default ErrorMessage
