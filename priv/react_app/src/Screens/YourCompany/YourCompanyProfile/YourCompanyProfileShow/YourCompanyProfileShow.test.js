import React from 'react';
import { shallow } from 'enzyme';
import YourCompanyProfileShow from './YourCompanyProfileShow';

describe('current company show should function correctly', () => {
  let props;
  beforeEach(() => {
    props = {
      resetForm: jest.fn()
    };
  });

  it('should render without crashing', () => {
    shallow(
      <YourCompanyProfileShow
        id="1"
        getCurrentCompany={jest.fn()}
        currentCompany={{}}
        fetching={false}
        {...props}
      />
    );
  });
});
