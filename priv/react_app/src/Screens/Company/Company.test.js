import React from 'react';
import { shallow } from 'enzyme';
import Company from './Company';
import NotFound from '../NotFound';
import HtmlTitle from '../../Components/HtmlTitle';
import MailLink from '../../Components/MailLink';

it('should render without crashing', () => {
  const company = {};
  shallow(<Company company={company} />);
});

it('should render NotFound if there is no company', () => {
  const company = {};
  const wrapper = shallow(<Company company={company} />);

  expect(wrapper.find(NotFound)).toHaveLength(1);
});

it('should set html title', () => {
  const company = {
    name: 'Test Company',
    email: 'test@email.com'
  };
  const wrapper = shallow(<Company company={company} />);

  expect(wrapper.contains(<HtmlTitle title={company.name} />)).toBeTruthy();
});

it('should render company information', () => {
  const company = {
    name: 'Test Company',
    email: 'test@email.com'
  };
  const wrapper = shallow(<Company company={company} />);

  expect(wrapper.contains(<h1>{company.name}</h1>)).toBeTruthy();
  expect(wrapper.find(MailLink)).toHaveLength(1);
});
