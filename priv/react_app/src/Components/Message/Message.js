import React from 'react'
import PropTypes from 'prop-types'

import AlertError from 'material-ui/svg-icons/alert/error';
import {red500} from 'material-ui/styles/colors';

import ActionCheckCirle from 'material-ui/svg-icons/action/check-circle';
import {green500} from 'material-ui/styles/colors';

import { Link } from 'react-router-dom'
import './Message.css'

/**
 * A Component which renders a message
 * - Consists of an icon, text, and a link
 */
const Message = ({message, linkUrl, linkText, type}) => {

  let icon = null
  switch(type) {
    case 'error':
      icon = <AlertError color={red500} style={styles.icon}/>
      break;
    case 'success':
      icon = <ActionCheckCirle color={green500} style={styles.icon}/>
      break;
    default:
      icon = ''
  }

  return (
    <div className="Message_Component">
      {icon}
      <div className="message">
        <div>{message}</div>
        { linkUrl ? <Link to={linkUrl}>{linkText}</Link> : null }
      </div>
    </div>
  )
}

const styles = {
  icon: {
    height: '200px',
    width: 'auto',
  }
}

Message.propTypes = {
  type: PropTypes.oneOf(['error', 'success']).isRequired,
  message: PropTypes.string.isRequired,
  linkUrl: PropTypes.string,
  linkText: PropTypes.string
}

export default Message
