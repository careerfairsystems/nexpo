import React from 'react';
import { shallow } from 'enzyme';
import YourCompanyApplications from './YourCompanyApplications';

it('should render without crashing', () => {
  shallow(
    <YourCompanyApplications
      currentCompany={{}}
      getCurrentCompany={jest.fn()}
      updateStudentSessionAppl={jest.fn()}
      updating={false}
      fetching={false}
    />
  );
});
