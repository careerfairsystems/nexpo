import React from 'react';
import InvisibleLink from '../../Components/InvisibleLink';

const Info = () => (
  <div>
    <h1>Welcome to ARKAD!</h1>
    <h3>What is this?</h3>
    <h4>
      This is the inhouse project management system for ARKAD, called Nexpo.
    </h4>
    <br />
    <h3>How to register for Nexpo</h3>
    <h4>
      <li>
        Go to <InvisibleLink to="/signup"> sign up </InvisibleLink> and fill in
        your email address.
      </li>
      <li>
        Go to your email inbox and validate your email address by visiting the
        link.
      </li>
      <li>Complete the registration by filling the sign up form.</li>
    </h4>
    <br />
    <h3>Do you have any questions about the registration process?</h3>
    <h4>
      Contact:
      <a href="mailto:company.arkad@tlth.se"> company.arkad@tlth.se </a>
    </h4>
  </div>
);

export default Info;
