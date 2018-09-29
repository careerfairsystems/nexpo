import React from 'react';
import { shallow } from 'enzyme';
import Company from './Company';
import NotFound from '../NotFound';
import HtmlTitle from '../../Components/HtmlTitle';
import LoadingSpinner from '../../Components/LoadingSpinner';

it('should render without crashing', () => {
  const props = {
    company: {},
    createCompany: jest.fn(),
    fetching: false,
    getCompany: jest.fn(),
    resetForm: jest.fn(),
    updateCompany: jest.fn()
  };
  shallow(<Company id="1" {...props} />);
});
it('should render loading while fetching ', () => {
  const props = {
    company: {},
    createCompany: jest.fn(),
    fetching: true,
    getCompany: jest.fn(),
    resetForm: jest.fn(),
    updateCompany: jest.fn()
  };
  const wrapper = shallow(<Company id="1" {...props} />);

  expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
});

it('should render NotFound if there is no company and not fetching', () => {
  const props = {
    company: {},
    createCompany: jest.fn(),
    fetching: false,
    getCompany: jest.fn(),
    resetForm: jest.fn(),
    updateCompany: jest.fn()
  };

  const wrapper = shallow(<Company id="1" {...props} />);

  expect(wrapper.find(NotFound)).toHaveLength(1);
});

it('should set html title', () => {
  const props = {
    company: {
      name: 'Test Company',
      website: 'testcompany.com',
      describe: 'We do testing!'
    },
    createCompany: jest.fn(),
    fetching: false,
    getCompany: jest.fn(),
    resetForm: jest.fn(),
    updateCompany: jest.fn()
  };
  const wrapper = shallow(<Company id="1" {...props} />);

  expect(
    wrapper.contains(<HtmlTitle title={props.company.name} />)
  ).toBeTruthy();
});

it('should render company information', () => {
  const props = {
    company: {
      name: 'Test Company',
      website: 'testcompany.com',
      describe: 'We do testing!'
    },
    createCompany: jest.fn(),
    fetching: false,
    getCompany: jest.fn(),
    resetForm: jest.fn(),
    updateCompany: jest.fn()
  };
  const wrapper = shallow(<Company id="1" {...props} />);

  expect(wrapper.contains(<h1>{props.company.name}</h1>)).toBeTruthy();
  // expect(wrapper.find(MailLink)).toHaveLength(1);
});
