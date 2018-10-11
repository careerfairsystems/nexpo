import React from 'react';
import { shallow } from 'enzyme';
import { capitalize } from 'lodash/fp';
import RoleShow from './RoleShow';
import NotFound from '../../../NotFound';
import HtmlTitle from '../../../../Components/HtmlTitle';

it('should render without crashing', () => {
  const role = {};
  const func = jest.fn();
  shallow(<RoleShow id="1" role={role} getRole={func} />);
});

it('should render NotFound if there is no role', () => {
  const role = {};
  const func = jest.fn();
  const wrapper = shallow(<RoleShow id="1" role={role} getRole={func} />);

  expect(wrapper.find(NotFound)).toHaveLength(1);
});

it('should set html title', () => {
  const role = {
    type: 'test',
    permissions: ['read_all', 'write_all']
  };
  const func = jest.fn();
  const wrapper = shallow(<RoleShow id="1" role={role} getRole={func} />);

  expect(
    wrapper.contains(<HtmlTitle title={capitalize(role.type)} />)
  ).toBeTruthy();
});

it('should render role information', () => {
  const role = {
    type: 'test',
    permissions: ['read_all', 'write_all']
  };
  const func = jest.fn();
  const wrapper = shallow(<RoleShow id="1" role={role} getRole={func} />);

  expect(wrapper.contains(<h1>{capitalize(role.type)}</h1>)).toBeTruthy();
});
