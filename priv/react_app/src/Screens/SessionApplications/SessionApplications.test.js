import React from 'react';
import { shallow } from 'enzyme';
import LoadingSpinner from '../../Components/LoadingSpinner';
import NotFound from '../NotFound';
import SessionApplications from './SessionApplications';

it('renders without crashing', () => {
  const props = {
    applications: [{ id: 1, companyId: 1, studentId: 1 }],
    getAllCompanies: jest.fn(),
    destroyStudentSessionAppl: jest.fn()
  };
  shallow(<SessionApplications {...props} />);
});

it('renders loadingspinner when fetching', () => {
  const props = {
    applications: [{ id: 1, companyId: 1, studentId: 1 }],
    fetching: true,
    getAllCompanies: jest.fn(),
    destroyStudentSessionAppl: jest.fn()
  };
  const wrapper = shallow(<SessionApplications {...props} />);
  expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
});

it('renders NotFound when  not fetching and applications are empty', () => {
  const props = {
    applications: null,
    fetching: false,
    getAllCompanies: jest.fn(),
    destroyStudentSessionAppl: jest.fn()
  };
  const wrapper = shallow(<SessionApplications {...props} />);
  expect(wrapper.find(NotFound)).toHaveLength(1);
});
