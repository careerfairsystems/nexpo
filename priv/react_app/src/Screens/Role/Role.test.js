import React from 'react';
import { shallow } from 'enzyme';
import Role from './Role';
import NotFound from '../NotFound';
import HtmlTitle from '../../Components/HtmlTitle';

it('should render without crashing', () => {
  const role = {};
  const func = jest.fn();
  shallow(<Role id="1" role={role} getRole={func} />);
});

it('should render NotFound if there is no role', () => {
  const role = {};
  const func = jest.fn();
  const wrapper = shallow(<Role id="1" role={role} getRole={func} />);

  expect(wrapper.find(NotFound)).toHaveLength(1);
});

it('should set html title', () => {
  const role = {
    type: 'Test Role',
    permissions: ['read_all', 'write_all']
  };
  const func = jest.fn();
  const wrapper = shallow(<Role id="1" role={role} getRole={func} />);

  expect(wrapper.contains(<HtmlTitle title={role.name} />)).toBeTruthy();
});

it('should render role information', () => {
  const role = {
    name: 'Test Role',
    email: 'test@email.com'
  };
  const func = jest.fn();
  const wrapper = shallow(<Role id="1" role={role} getRole={func} />);

  expect(wrapper.contains(<h1>{role.name}</h1>)).toBeTruthy();
});
