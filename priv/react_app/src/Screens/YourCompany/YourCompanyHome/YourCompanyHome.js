import React from 'react';
import InvisibleLink from '../../../Components/InvisibleLink';
import '../YourCompany.css';

const YourCompanyHome = () => (
  <div className="your-company-home">
    <h1>Welcome to Your Company!</h1>
    <p>
      Here you can view/edit your company information, view all applications
      from students and view all time slots for your student sessions.
    </p>
    <h4>
      <li>
        Please check and update your
        <InvisibleLink to="/company/profile"> company profile </InvisibleLink>
        with the correct information.
      </li>
      <li>
        Go to your
        <InvisibleLink to="/company/applications"> applications </InvisibleLink>
        and rate each student from 1 to 5 stars.
      </li>
      <li>
        Check whether your
        <InvisibleLink to="/company/timeslots"> time slots </InvisibleLink>
        are correct, otherwise inform us.
      </li>
    </h4>
    <br />
    <br />
    <h3>Do you have any questions about your company?</h3>
    <h4>
      Contact:
      <a href="mailto:company.arkad@tlth.se"> company.arkad@tlth.se </a>
    </h4>
  </div>
);

export default YourCompanyHome;
