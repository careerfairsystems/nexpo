import React from 'react';
import { shallow } from 'enzyme';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Deadlines from './Deadlines';
import LoadingSpinner from '../../../Components/LoadingSpinner';

it('should render without crashing', () => {
  const func = () => 'a';
  shallow(<Deadlines getAllDeadlines={func} />);
});

it('should render loading', () => {
  const func = () => 'a';
  const wrapper = shallow(<Deadlines fetching getAllDeadlines={func} />);
  expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
});

it('calls fetch all deadlines prop on mount', () => {
  const func = jest.fn();
  const wrapper = shallow(<Deadlines getAllDeadlines={func} />);

  expect(func).toHaveBeenCalledTimes(1);
});

it('calls fetch all deadlines prop on mount', () => {
  const func = jest.fn();
  const wrapper = shallow(<Deadlines getAllDeadlines={func} />);

  wrapper.find(Button).simulate('click');
});

it('should render deadlines', () => {
  const func = jest.fn();
  const deadlines = {
    '1': {
      id: 1,
      name: 'Host Application',
      start: 'DATE',
      end: 'DATE'
    },
    '2': {
      id: 2,
      name: 'Company Registration',
      start: 'DATE',
      end: 'DATE'
    }
  };
  const wrapper = shallow(
    <Deadlines id="1" deadlines={deadlines} getAllDeadlines={func} />
  );

  expect(wrapper.find(Table)).toHaveLength(1);
});
