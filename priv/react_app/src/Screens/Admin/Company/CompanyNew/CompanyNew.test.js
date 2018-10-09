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

  it('beforeUpload correctly changes state', () => {
    const wrapper = shallow(<CompanyNew id="1" {...props} />);
    expect(wrapper.state().company.logoUrl).toEqual(null);
    const file = 'New File';
    wrapper.instance().beforeUpload(file, 'logoUrl');
    expect(wrapper.state().company.logoUrl).toEqual(file);
    wrapper.instance().onRemove('logoUrl');
    expect(wrapper.state().company.logoUrl).toEqual(null);
  });
  // If there is not a company in props we want to create a new one
  it('updateCompany functions correctly', () => {
    const wrapper = shallow(<CompanyNew id="1" {...props} />);
    const description = 'Our company is awesome';
    wrapper.instance().createCompany({ description });
    expect(props.createCompany).toHaveBeenCalledWith({
      company: { description, logoUrl: null }
    });
  });
});
