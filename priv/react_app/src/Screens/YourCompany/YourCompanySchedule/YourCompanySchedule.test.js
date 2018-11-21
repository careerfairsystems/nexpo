import React from 'react';
import { shallow } from 'enzyme';
import YourCompanySchedule from './YourCompanySchedule';

it('should render without crashing', () => {
  shallow(<YourCompanySchedule />);
});
