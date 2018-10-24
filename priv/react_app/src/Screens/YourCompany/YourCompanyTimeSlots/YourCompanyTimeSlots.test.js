import React from 'react';
import { shallow } from 'enzyme';
import YourCompanyTimeSlots from './YourCompanyTimeSlots';

it('should render without crashing', () => {
  shallow(
    <YourCompanyTimeSlots currentCompany={{}} getCurrentCompany={jest.fn()} />
  );
});
