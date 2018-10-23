import React from 'react';
import { shallow } from 'enzyme';
import YourCompanyProfileShow from './YourCompanyProfileShow';

describe('current company show should function correctly', () => {
  beforeEach(() => {});

  it('should render without crashing', () => {
    const f = jest.fn();
    shallow(
      <YourCompanyProfileShow id="1" getCurrentCompany={f} currentCompany={{}} />
    );
  });
});
