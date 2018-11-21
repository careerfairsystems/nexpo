import React from 'react';
import { shallow } from 'enzyme';
import StudentSessions from './StudentSessions';

it('should render without crashing', () => {
  const createBulkStudentSessions = jest.fn();
  shallow(
    <StudentSessions createBulkStudentSessions={createBulkStudentSessions} />
  );
});
