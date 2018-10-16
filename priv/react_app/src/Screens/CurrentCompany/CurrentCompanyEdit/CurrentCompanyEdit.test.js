import React from 'react';
import { shallow } from 'enzyme';
import CurrentCompanyEdit from './CurrentCompanyEdit';

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
    shallow(<CurrentCompanyEdit id="1" {...props} />);
  });
});
