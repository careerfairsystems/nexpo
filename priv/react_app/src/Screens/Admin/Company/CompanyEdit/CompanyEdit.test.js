import React from 'react';
import { shallow } from 'enzyme';
import CompanyEdit from './CompanyEdit';
import NotFound from '../../../NotFound';
import HtmlTitle from '../../../../Components/HtmlTitle';
import LoadingSpinner from '../../../../Components/LoadingSpinner';

describe('CompanyEdit', () => {
  let props;
  beforeEach(() => {
    props = {
      company: {},
      createCompany: jest.fn(),
      fetching: false,
      getCompany: jest.fn(),
      history: {
        push: jest.fn()
      },
      resetForm: jest.fn(),
      updateCompany: jest.fn()
    };
  });

  it('should render without crashing', () => {
    const company = {
      name: 'Test CompanyEdit',
      website: 'testcompany.com',
      description: 'We do testing!',
      studentSessionDays: 0
    };
    shallow(<CompanyEdit id="1" {...props} company={company} />);
  });

  it('should render loading while fetching ', () => {
    const wrapper = shallow(<CompanyEdit id="1" {...props} fetching website />);

    expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
  });

  it('should render NotFound if there is no company and not fetching', () => {
    const wrapper = shallow(<CompanyEdit id="1" {...props} />);

    expect(wrapper.find(NotFound)).toHaveLength(1);
  });

  it('should set html title', () => {
    const company = {
      name: 'Test CompanyEdit',
      website: 'testcompany.com',
      description: 'We do testing!',
      studentSessionDays: 3
    };
    const wrapper = shallow(
      <CompanyEdit id="1" {...props} company={company} />
    );

    expect(wrapper.contains(<HtmlTitle title={company.name} />)).toBeTruthy();
  });

  it('should render company information', () => {
    const company = {
      name: 'Test CompanyEdit',
      website: 'testcompany.com',
      description: 'We do testing!',
      studentSessionDays: 1
    };
    const wrapper = shallow(
      <CompanyEdit id="1" {...props} company={company} />
    );

    expect(wrapper.contains(<h1>{company.name}</h1>)).toBeTruthy();
    // expect(wrapper.find(MailLink)).toHaveLength(1);
  });

  it('updateCompany functions correctly', () => {
    const company = {
      name: 'Test CompanyEdit',
      website: 'testcompany.com',
      description: 'We do testing!',
      studentSessionDays: 2
    };
    const id = '1';
    const wrapper = shallow(
      <CompanyEdit id={id} {...props} company={company} />
    );
    const newDescription = 'Our company is awesome';
    wrapper.instance().updateCompany({ description: newDescription });
    expect(props.updateCompany).toHaveBeenCalledWith(id, {
      company: { description: newDescription }
    });
  });
});
