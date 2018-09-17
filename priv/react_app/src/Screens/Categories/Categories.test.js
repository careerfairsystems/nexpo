import React from 'react';
import { shallow } from 'enzyme';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Categories from './Categories';
import LoadingSpinner from '../../Components/LoadingSpinner';

it('should render without crashing', () => {
  const func = () => 'a';
  shallow(<Categories getAllCategories={func} />);
});

it('should render loading', () => {
  const func = () => 'a';
  const wrapper = shallow(<Categories fetching getAllCategories={func} />);
  expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
});

it('calls fetch all categories prop on mount', () => {
  const func = jest.fn();
  const wrapper = shallow(<Categories getAllCategories={func} />);

  expect(func).toHaveBeenCalledTimes(1);
});

it('calls fetch all categories prop on mount', () => {
  const func = jest.fn();
  const wrapper = shallow(<Categories getAllCategories={func} />);

  wrapper.find(Button).simulate('click');
});

it('should render categories', () => {
  const func = jest.fn();
  const categories = {
    '1': { title: 'Logistik', id: 1, attributes: [1, 2, 3] },
    '2': { title: 'Avtal', id: 2, attributes: [4, 5, 6] }
  };
  const attributes = {
    '1': { title: 'Eluttag', id: 1, category: 1 },
    '2': { title: 'Internetkoder', id: 2, category: 1 },
    '3': { title: 'Ståbord', id: 3, category: 1 },
    '4': { title: 'Koli', id: 4, category: 1 },
    '5': { title: 'Beskrivning', id: 5, category: 2 },
    '6': { title: 'Länk', id: 6, category: 2 }
  };

  const wrapper = shallow(
    <Categories
      id="1"
      categories={categories}
      attributes={attributes}
      getAllCategories={func}
    />
  );

  expect(wrapper.find(Table)).toHaveLength(1);
});
