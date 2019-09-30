import React, { Component } from 'react';
import { Alert } from 'antd';
import './LinkAlert.css';

/**
 * A Component which renders an alert
 * - Consists of an icon, text, and a link
 */

type Props = {
  type: 'warning' | 'success',
  message: string,
  description?: ?string,
  link?: ?string,
  history: History
};

class LinkAlert extends Component<Props> {
  constructor() {
    super();
    this.tester = this.tester.bind();
  }

  tester(link) {
    window.location.href=link;
  }

  render() {
    const { link, message, description, type } = this.props;

    return (
      <div onClick={() => this.tester(link)} className='test'>
        <Alert
          message={message}
          description={description}
          type={type}
          showIcon
          onClick={event => this.tester(event)}
        />
      </div>
    );
  }
}
LinkAlert.defaultProps = {
  description: '',
  link: './'
};

export default LinkAlert;
