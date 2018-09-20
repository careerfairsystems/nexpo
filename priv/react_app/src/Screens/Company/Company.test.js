import React from 'react';
import { shallow } from 'enzyme';
import Company from './Company';
import NotFound from '../NotFound';
import HtmlTitle from '../../Components/HtmlTitle';
import MailLink from '../../Components/MailLink';

it('should render without crashing', () => {
  const company = {};
  const func = jest.fn();
  shallow(<Company id="1" company={company} getCompany={func} />);
});

it('should render NotFound if there is no company', () => {
  const company = {};
  const func = jest.fn();
  const wrapper = shallow(
    <Company id="1" company={company} getCompany={func} />
  );

  expect(wrapper.find(NotFound)).toHaveLength(1);
});

it('should set html title', () => {
  const company = {
    name: 'Test Company',
    website: 'testcompany.com',
    describe: 'We do testing!'
  };
  const func = jest.fn();
  const wrapper = shallow(
    <Company id="1" company={company} getCompany={func} />
  );

  expect(wrapper.contains(<HtmlTitle title={company.name} />)).toBeTruthy();
});

it('should render company information', () => {
  const company = {
    name: 'Test Company',
    email: 'test@email.com'
  };
  const func = jest.fn();
  const wrapper = shallow(
    <Company id="1" company={company} getCompany={func} />
  );

  expect(wrapper.contains(<h1>{company.name}</h1>)).toBeTruthy();
  // expect(wrapper.find(MailLink)).toHaveLength(1);
});
