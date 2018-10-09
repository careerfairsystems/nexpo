import React from 'react';
import { shallow } from 'enzyme';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Programmes from './Programmes';
import LoadingSpinner from '../../../Components/LoadingSpinner';

it('should render without crashing', () => {
  const func = () => 'a';
  shallow(<Users getAllProgrammes={func} />);
});

it('should render loading', () => {
  const func = () => 'a';
  const wrapper = shallow(<Programmes fetching getAllProgrammes={func} />);
  expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
});

it('calls fetch all programmes prop on mount', () => {
  const func = jest.fn();
  const wrapper = shallow(<Programmes getAllProgrammes={func} />);

  expect(func).toHaveBeenCalledTimes(1);
});

it('calls fetch all programmes prop on mount', () => {
  const func = jest.fn();
  const wrapper = shallow(<Programmes getAllProgrammes={func} />);

  wrapper.find(Button).simulate('click');
});

it('should render programmes', () => {
  const func = jest.fn();
  const programmes = {
    '1': {
      id: 1,
      name: 'Datateknik'
    },
    '2': {
      id: 2,
      name: 'Annat program'
    }
  };
  const wrapper = shallow(<Programmes id="1" programmes={programmes} getAllProgrammes={func} />);

  expect(wrapper.find(Table)).toHaveLength(1);
});
