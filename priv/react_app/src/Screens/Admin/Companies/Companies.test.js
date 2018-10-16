import React from 'react';
import { shallow } from 'enzyme';
import { Table, Button } from 'antd';

import Companies from './Companies';
import LoadingSpinner from '../../../Components/LoadingSpinner';

it('should render without crashing', () => {
  const func = () => 'a';
  shallow(<Companies getAllCompanies={func} />);
});

it('should render loading', () => {
  const func = () => 'a';
  const wrapper = shallow(<Companies fetching getAllCompanies={func} />);
  expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
});

it('calls fetch all companies prop on mount', () => {
  const func = jest.fn();
  shallow(<Companies getAllCompanies={func} />);

  expect(func).toHaveBeenCalledTimes(1);
});

it('calls fetch all companies prop on mount', () => {
  const func = jest.fn();
  const wrapper = shallow(<Companies getAllCompanies={func} />);

  wrapper.find(Button).simulate('click');
});

it('should render companies', () => {
  const func = jest.fn();
  const companies = {
    '1': {
      id: 1,
      name: 'Spotify',
      description: 'We do music!',
      website: 'www.spotify.com'
    },
    '2': {
      id: 2,
      name: 'Google',
      description: 'We code!',
      website: 'www.google.com'
    }
  };
  const wrapper = shallow(
    <Companies id="1" companies={companies} getAllCompanies={func} />
  );

  expect(wrapper.find(Table)).toHaveLength(1);
});
