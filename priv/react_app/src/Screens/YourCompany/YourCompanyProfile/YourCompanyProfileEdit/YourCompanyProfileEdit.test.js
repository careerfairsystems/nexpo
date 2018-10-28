import React from 'react';
import { shallow } from 'enzyme';
import YourCompanyProfileEdit from './YourCompanyProfileEdit';

describe('current company edit should function correctly', () => {
  let props;
  beforeEach(() => {
    props = {
      currentCompany: {},
      fetching: false,
      history: {
        action: 'PUSH',
        block: jest.fn(),
        push: jest.fn(),
        go: jest.fn(),
        goBack: jest.fn(),
        goForward: jest.fn(),
        length: 0,
        listen: jest.fn(),
        replace: jest.fn(),
        location: { hash: '', pathname: '', search: '' }
      },
      getCurrentCompany: jest.fn(),
      updateCurrentCompany: jest.fn()
    };
  });

  it('should render without crashing', () => {
    shallow(<YourCompanyProfileEdit id="1" {...props} />);
  });
});
