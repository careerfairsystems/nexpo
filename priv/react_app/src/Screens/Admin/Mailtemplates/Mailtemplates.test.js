import React from 'react';
import { shallow } from 'enzyme';
import { Table, Button } from 'antd';

import Mailtemplates from './Mailtemplates';
import LoadingSpinner from '../../../Components/LoadingSpinner';

it('should render without crashing', () => {
  const func = () => 'a';
  shallow(<Mailtemplates getAllMailtemplates={func} />);
});

it('should render loading', () => {
  const func = () => 'a';
  const wrapper = shallow(
    <Mailtemplates fetching getAllMailtemplates={func} />
  );
  expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
});

it('calls fetch all mailtemplates prop on mount', () => {
  const func = jest.fn();
  shallow(<Mailtemplates getAllMailtemplates={func} />);

  expect(func).toHaveBeenCalledTimes(1);
});

it('calls fetch all mailtemplates prop on mount', () => {
  const func = jest.fn();
  const wrapper = shallow(<Mailtemplates getAllMailtemplates={func} />);

  wrapper.find(Button).simulate('click');
});

it('should render mailtemplates', () => {
  const func = jest.fn();
  const mailtemplates = {
    '1': {
      id: 1,
      name: 'Welcome',
      content: '<h1>Welcome!</h1>'
    },
    '2': {
      id: 2,
      name: 'Signup',
      content: '<h1>Welcome!</h1>'
    }
  };
  const wrapper = shallow(
    <Mailtemplates
      id="1"
      mailtemplates={mailtemplates}
      getAllMailtemplates={func}
    />
  );

  expect(wrapper.find(Table)).toHaveLength(1);
});
