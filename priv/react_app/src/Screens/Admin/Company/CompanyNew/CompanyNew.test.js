import React from 'react';
import { shallow } from 'enzyme';
import CompanyNew from './CompanyNew';

describe('CompanyNew', () => {
  let props;
  beforeEach(() => {
    props = {
      createCompany: jest.fn(),
      fetching: false,
      getCompany: jest.fn(),
      resetForm: jest.fn(),
      updateCompany: jest.fn()
    };
  });

  it('should render without crashing', () => {
    shallow(<CompanyNew {...props} />);
  });

  // If there is not a company in props we want to create a new one
  it('updateCompany functions correctly', () => {
    const wrapper = shallow(<CompanyNew id="1" {...props} />);
    const name = 'Testify';
    const description = 'Our company is awesome';
    wrapper.instance().createCompany({ name, description });
    expect(props.createCompany).toHaveBeenCalledWith({
      company: { name, description }
    });
  });
});
