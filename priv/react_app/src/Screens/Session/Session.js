import React, { Component } from 'react';
import InvisibleLink from '../../Components/InvisibleLink';

class Session extends Component {
  render() {
    return (
      <div>
        <InvisibleLink to="session/application">Apply</InvisibleLink>
        <br />
        <InvisibleLink to="session/applications">
          View your applications
        </InvisibleLink>
        <br />
        <InvisibleLink to="session/companies">
          View available companies
        </InvisibleLink>
        <br />
      </div>
    );
  }
}

export default Session;
