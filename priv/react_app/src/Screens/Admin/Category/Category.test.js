import React from 'react';
import { shallow } from 'enzyme';
import Category from './Category';
import NotFound from '../../NotFound';
import HtmlTitle from '../../../Components/HtmlTitle';

it('should render without crashing', () => {
  const func = jest.fn();
  const category = {};
  shallow(<Category id="1" category={category} getCategory={func} />);
});

it('should render NotFound if there is no category', () => {
  const func = jest.fn();
  const category = {};
  const wrapper = shallow(
    <Category id="1" category={category} getCategory={func} />
  );

  expect(wrapper.find(NotFound)).toHaveLength(1);
});

it('should set html title', () => {
  const func = jest.fn();
  const category = {
    title: 'Test Category'
  };
  const wrapper = shallow(
    <Category id="1" category={category} getCategory={func} />
  );

  expect(wrapper.contains(<HtmlTitle title={category.title} />)).toBeTruthy();
});

it('should render category information', () => {
  const func = jest.fn();
  const category = {
    title: 'Test Category'
  };
  const wrapper = shallow(
    <Category id="1" category={category} getCategory={func} />
  );

  expect(wrapper.contains(<h1>{category.title}</h1>)).toBeTruthy();
});
