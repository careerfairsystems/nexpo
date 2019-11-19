import React from 'react';
import { shallow } from 'enzyme';
import YourCompanyScans from './YourCompanyScans';

it('should render without crashing', () => {
  shallow(
    <YourCompanyScans
      currentCompany={{ blips: [] }}
      getCurrentCompany={jest.fn()}
      fetching={false}
    />
  );
});
