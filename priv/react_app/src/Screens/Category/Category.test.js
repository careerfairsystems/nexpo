import React from 'react';
import { shallow } from 'enzyme';
import Category from './Category';
import NotFound from '../NotFound';
import HtmlTitle from '../../Components/HtmlTitle';

it('should render without crashing', () => {
  const category = {};
  shallow(<Category category={category} />);
});

it('should render NotFound if there is no category', () => {
  const category = {};
  const wrapper = shallow(<Category category={category} />);

  expect(wrapper.find(NotFound)).toHaveLength(1);
});

it('should set html title', () => {
  const category = {
    title: 'Test Category'
  };
  const wrapper = shallow(<Category category={category} />);

  expect(wrapper.contains(<HtmlTitle title={category.title} />)).toBeTruthy();
});

it('should render category information', () => {
  const category = {
    title: 'Test Category'
  };
  const wrapper = shallow(<Category category={category} />);

  expect(wrapper.contains(<h1>{category.title}</h1>)).toBeTruthy();
});
