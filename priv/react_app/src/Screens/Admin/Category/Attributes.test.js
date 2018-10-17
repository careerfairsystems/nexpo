import React from 'react';
import { shallow } from 'enzyme';
import { Table } from 'antd';
import ConnectedAttributes, { Attributes } from './Attributes';
import { createMockStore } from '../../../TestHelper';
import LoadingSpinner from '../../../Components/LoadingSpinner';

it('should render without crashing', () => {
  shallow(<Attributes fetching={false} />);
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
    <Attributes attributes={attributes} entries={entries} fetching={false} />
  );

  expect(wrapper.find(Table)).toHaveLength(1);
});

it('should render without crashing', () => {
  const state = { entities: {} };

  shallow(<ConnectedAttributes ids={[]} />, {
    context: { store: createMockStore(state) }
  });
});

it('should render without crashing', () => {
  const state = {
    api: { categories: { fetching: false } },
    entities: {
      companies: {
        '1': { id: 1, name: 'Spotify' },
        '2': { id: 2, name: 'Google' }
      },
      attributes: {
        '1': { id: 1, title: 'Beskrivning', entries: [1, 3, 5] },
        '2': { id: 2, title: 'Ansvarig', entries: [2, 4] }
      },
      entries: {
        '1': { value: '43', id: 1, company: 1, attribute: 1 },
        '2': { value: '68', id: 2, company: 2, attribute: 2 },
        '3': { value: '61', id: 3, company: 2, attribute: 1 },
        '4': { value: '66', id: 4, company: 2, attribute: 2 },
        '5': { value: '29', id: 5, company: 1, attribute: 1 }
      }
    }
  };

  shallow(<ConnectedAttributes ids={[1, 2]} />, {
    context: { store: createMockStore(state) }
  });
});
