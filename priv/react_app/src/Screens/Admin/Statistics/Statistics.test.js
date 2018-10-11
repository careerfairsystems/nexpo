import React from 'react';
import { shallow } from 'enzyme';
import Statistics from './Statistics';

it('should render without crashing', () => {
  const func = () => 'a';
  const statistics = {};
  shallow(<Statistics statistics={statistics} getAllStatistics={func} />);
});

it('calls fetch all roles prop on mount', () => {
  const func = jest.fn();
  const statistics = {};
  const wrapper = shallow(
    <Statistics statistics={statistics} getAllStatistics={func} />
  );

  expect(func).toHaveBeenCalledTimes(1);
});
