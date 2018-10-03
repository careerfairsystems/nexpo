import React, { Component } from 'react';
import InvisibleLink from '../../Components/InvisibleLink';

class Session extends Component {
  render() {
    return (
      <div>
        <h3>
          <li>
            <InvisibleLink to="session/application">Apply</InvisibleLink>
          </li>
          <br />
          <li>
            <InvisibleLink to="session/applications">
              View your applications
            </InvisibleLink>
          </li>
          <br />
          <li>
            <InvisibleLink to="session/companies">
              View available companies
            </InvisibleLink>
          </li>
          <br />
        </h3>
      </div>
    );
  }
}

export default Session;
