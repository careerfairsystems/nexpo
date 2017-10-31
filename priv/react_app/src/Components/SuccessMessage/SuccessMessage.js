import React from 'react'
import Message from '../Message'

/**
 * Higher order component for delivering a successful message
 */
const SuccessMessage = (props) => {
  return <Message type='success' {...props} />
}

export default SuccessMessage
