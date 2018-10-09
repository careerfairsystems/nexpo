import React from 'react';
import { shallow } from 'enzyme';
import CompanyNew from './CompanyNew';
import NotFound from '../../../NotFound';
import HtmlTitle from '../../../../Components/HtmlTitle';
import LoadingSpinner from '../../../../Components/LoadingSpinner';

describe('CompanyNew', () => {
  let props;
  beforeEach(() => {
    props = {
      company: {},
      createCompany: jest.fn(),
      fetching: false,
      getCompany: jest.fn(),
      resetForm: jest.fn(),
      updateCompany: jest.fn()
    };
  });

  it('should render without crashing', () => {
    const company = {
      name: 'Test CompanyNew',
      website: 'testcompany.com',
      describe: 'We do testing!',
      studentSessionDays: 0
    };
    shallow(<CompanyNew id="1" {...props} company={company} />);
  });

  it('should render loading while fetching ', () => {
    const wrapper = shallow(<CompanyNew id="1" {...props} fetching />);

    expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
  });

  it('should render NotFound if there is no company and not fetching', () => {
    const wrapper = shallow(<CompanyNew id="1" {...props} />);

    expect(wrapper.find(NotFound)).toHaveLength(1);
  });

  it('should set html title', () => {
    const company = {
      name: 'Test CompanyNew',
      website: 'testcompany.com',
      describe: 'We do testing!',
      studentSessionDays: 3
    };
    const wrapper = shallow(<CompanyNew id="1" {...props} company={company} />);

    expect(wrapper.contains(<HtmlTitle title={company.name} />)).toBeTruthy();
  });

  it('should render company information', () => {
    const company = {
      name: 'Test CompanyNew',
      website: 'testcompany.com',
      describe: 'We do testing!',
      studentSessionDays: 1
    };
    const wrapper = shallow(<CompanyNew id="1" {...props} company={company} />);

    expect(wrapper.contains(<h1>{company.name}</h1>)).toBeTruthy();
    // expect(wrapper.find(MailLink)).toHaveLength(1);
  });

  it('should set edit mode if url contains #edit', () => {
    const company = {
      name: 'Test CompanyNew',
      website: 'testcompany.com',
      describe: 'We do testing!',
      studentSessionDays: 0
    };
    const location = { hash: '#edit' };
    const wrapper = shallow(
      <CompanyNew id="1" {...props} company={company} location={location} />
    );
    expect(wrapper.state().edit).toEqual(true);
  });

  it('toggleEdit correctly changes state', () => {
    const wrapper = shallow(<CompanyNew id="1" {...props} />);
    expect(wrapper.state().edit).toEqual(false);
    wrapper.instance().toggleEdit();
    expect(wrapper.state().edit).toEqual(true);
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
    const newDescription = 'Our company is awesome';
    wrapper.instance().updateCompany({ description: newDescription });
    expect(props.createCompany).toHaveBeenCalledWith({
      company: { description: newDescription, logoUrl: null }
    });
  });
  // If there is a company in props we want to update it
  it('updateCompany functions correctly', () => {
    const company = {
      name: 'Test CompanyNew',
      website: 'testcompany.com',
      describe: 'We do testing!',
      studentSessionDays: 2
    };
    const id = '1';
    const wrapper = shallow(
      <CompanyNew id={id} {...props} company={company} />
    );
    const newDescription = 'Our company is awesome';
    wrapper.instance().updateCompany({ description: newDescription });
    expect(props.updateCompany).toHaveBeenCalledWith(id, {
      company: { description: newDescription, logoUrl: null }
    });
  });
});
