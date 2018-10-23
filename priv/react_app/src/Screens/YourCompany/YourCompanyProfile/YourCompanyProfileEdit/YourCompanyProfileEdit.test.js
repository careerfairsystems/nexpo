import React from 'react';
import { shallow } from 'enzyme';
import YourCompanyProfileEdit from './YourCompanyProfileEdit';

describe('current company edit should function correctly', () => {
  let props;
  beforeEach(() => {
    props = {
      currentCompany: {},
      fetching: false,
      history: { push: jest.fn() },
      getCurrentCompany: jest.fn(),
      updateCurrentCompany: jest.fn()
    };
  });

  it('should render without crashing', () => {
    shallow(<YourCompanyProfileEdit id="1" {...props} />);
  });
});
