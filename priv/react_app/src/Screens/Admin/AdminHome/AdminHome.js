import React from 'react';
import { isNil, join } from 'lodash/fp';

type Props = {
  roles?: Array<string>,
  permissions?: Array<string>
};
const AdminHome = ({ roles = [], permissions = [] }: Props) => (
  <div>
    <h1>Congratulations you did it!</h1>
    <h2>You have admin privileges!!</h2>
    <h3>You have the role(s): </h3>
    <h4>{isNil(roles) ? 'None!?' : join(', ', roles)}</h4>
    <h3>You have the permissions: </h3>
    <h4>{isNil(roles) ? 'None' : join(', ', permissions)}</h4>
    <br />
    <br />
    <h3>Do you have any questions about the admin privileges?</h3>
    <h4>
      Contact:
      <a href="mailto:it.arkad@tlth.se"> it.arkad@tlth.se </a>
    </h4>
  </div>
);

AdminHome.defaultProps = {
  roles: [],
  permissions: []
};

export default AdminHome;
