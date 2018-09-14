import React from 'react';
import { shallow } from 'enzyme';
import Categories from './Categories';

it('should render without crashing', () => {
  const func = () => 'a';
  shallow(<Categories getAllCategories={func} />);
});

it('calls fetch all categories prop on mount', () => {
  const func = jest.fn();
  const wrapper = shallow(<Categories getAllCategories={func} />);

  expect(func).toHaveBeenCalledTimes(1);
});
