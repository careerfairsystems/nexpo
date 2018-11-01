import React from 'react';
import { shallow } from 'enzyme';
import Statistics from './Statistics';

it('should render without crashing', () => {
  const func = jest.fn();
  const statistics = {};
  shallow(<Statistics statistics={statistics} getAllStatistics={func} />);
});

it('calls fetch all roles prop on mount', () => {
  const func = jest.fn();
  const statistics = {};
  shallow(<Statistics statistics={statistics} getAllStatistics={func} />);

  expect(func).toHaveBeenCalledTimes(1);
});

it('can render data', () => {
  const func = jest.fn();
  const statistics = {
    applicationsPerDay: [
      '2018-10-10',
      '2018-10-10',
      '2018-10-10',
      '2018-10-10',
      '2018-10-10',
      '2018-10-11',
      '2018-10-12',
      '2018-10-12',
      '2018-10-12',
      '2018-10-13'
    ],
    companyStats: [
      {
        id: 1,
        name: 'Google',
        nbrApplications: 5
      },
      { id: 2, name: 'Apple', nbrApplications: 10 }
    ]
  };

  shallow(<Statistics statistics={statistics} getAllStatistics={func} />);

  expect(func).toHaveBeenCalledTimes(1);
});
