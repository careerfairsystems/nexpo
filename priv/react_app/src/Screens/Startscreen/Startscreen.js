import React, { Component } from 'react';
import InvisibleLink from '../../Components/InvisibleLink';

class Startscreen extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to Arkad!</h1>

        <h3>You can now apply for Student Sessions.</h3>
        <InvisibleLink to="/session/application">
          Apply for Student Session
        </InvisibleLink>
        <br />
        <br />
        <h3>
          You can also view the companies that will have student sessions.
        </h3>
        <InvisibleLink to="/session/companies">Go to Companies</InvisibleLink>
      </div>
    );
  }
}

export default Startscreen;
