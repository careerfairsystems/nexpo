import React from 'react';
import { shallow } from 'enzyme';
import LoadingSpinner from '../../Components/LoadingSpinner';
import NotFound from '../NotFound';
import Home from './Home';
import RepresentativeHome from './RepresentativeHome';
import StudentHome from './StudentHome';

it('renders without crashing', () => {
  shallow(<Home />);
});

it('should render Loading when is fetching', () => {
  const wrapper = shallow(<Home fetching />);
  expect(wrapper.find(LoadingSpinner).length).toBe(1);
});

it('should render NotFound when currentUser is empty and not fetching', () => {
  const wrapper = shallow(<Home currentUser={{}} />);
  expect(wrapper.find(NotFound).length).toBe(1);
});

it('should render RepresentativeHome when currentUser is a representative', () => {
  const wrapper = shallow(<Home currentUser={{ representative: { id: 1 } }} />);
  expect(wrapper.find(RepresentativeHome).length).toBe(1);
});

it('should render StudentHome if none of the above cases are true', () => {
  const wrapper = shallow(<Home currentUser={{ name: 'Test' }} />);
  expect(wrapper.find(StudentHome).length).toBe(1);
});
