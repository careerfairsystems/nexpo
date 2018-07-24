import React from 'react'
import Message from '../Message'

type Props = {
  message: string,
  linkUrl: string,
  linkText: string
}

/**
 * Higher order component for delivering a successful message
 */
export const SuccessMessage = (props: Props) => <Message type='success' {...props} />
