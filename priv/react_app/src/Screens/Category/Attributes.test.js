import React from 'react';
import { shallow } from 'enzyme';
import Table from 'antd/lib/table';
import { Attributes } from './Attributes';
import LoadingSpinner from '../../Components/LoadingSpinner';

it('should render without crashing', () => {
  shallow(<Attributes />);
});

it('should render LoadingSpinner if fetching true', () => {
  const wrapper = shallow(<Attributes fetching />);

  expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
});

it('should render attributes information', () => {
  const attributes = [
    { title: 'Company', dataIndex: 'companyName', key: 'company' },
    { title: 'Eluttag', dataIndex: 'eluttag', key: 'eluttag' },
    { title: 'Bord', dataIndex: 'bord', key: 'bord' }
  ];
  const entries = [
    { id: 1, companyName: 'Intel', eluttag: '5', bord: '3' },
    { id: 2, companyName: 'Intel', eluttag: '3', bord: '2' },
    { id: 3, companyName: 'Intel', bord: '5' }
  ];
  const wrapper = shallow(
    <Attributes attributes={attributes} entries={entries} />
  );

  expect(wrapper.find(Table)).toHaveLength(1);
});
