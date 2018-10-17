import React from 'react';
import { shallow } from 'enzyme';
import YourCompanyApplications from './YourCompanyApplications';

it('should render without crashing', () => {
  shallow(<YourCompanyApplications />);
});
