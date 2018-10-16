import React from 'react';
import { shallow } from 'enzyme';
import CurrentCompanyShow from './CurrentCompanyShow';

describe('current company show should function correctly', () => {
  beforeEach(() => {});

  it('should render without crashing', () => {
    const f = jest.fn();
    shallow(
      <CurrentCompanyShow id="1" getCurrentCompany={f} currentCompany={{}} />
    );
  });
});
