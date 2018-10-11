import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import App from './App';
import ConnectedApp from './index';
import { createMockStore } from '../TestHelper';
import NotFound from '../Screens/NotFound';

it('renders without crashing', () => {
  shallow(
    <App
      isLoggedIn={false}
      currentUser={{}}
      pathname="/"
      logout={() => 'a'}
      redirect={() => 'a'}
    />
  );
});

it('renders isLoggedIn without crashing', () => {
  shallow(
    <App
      isLoggedIn
      currentUser={{ email: 'test@it', firstName: 'Tester', lastName: 'AB' }}
      pathname="/"
      logout={() => 'a'}
      redirect={() => 'a'}
    />
  );
});

const state = {
  api: {
    categories: { fetching: false, success: false },
    companies: { fetching: false, success: false },
    roles: { fetching: false, success: false },
    users: { fetching: false, success: false },
    current_user: { fetching: false, success: false },
    forgot_password: { fetching: false, success: false },
    login: { fetching: false, success: false },
    replace_password: { fetching: false, success: false },
    verify_forgot_password_key: { fetching: false, success: false }
  },
  entities: {
    users: {
      '1': { id: 1, email: 'dev@it', firstName: 'X', roles: [1, 2] },
      '2': { id: 2, email: 't@it', firstName: 'T', roles: [], student: 1 }
    },
    students: {
      '1': {
        id: 1,
        resumeEnUrl: null,
        resumeSvUrl: null,
        studentSessionApplications: [1],
        user: 1,
        year: 2000
      }
    },
    studentSessionApplications: {
      '1': {
        id: 1,
        company: 2,
        companyApproved: false,
        studentConfirmed: false,
        motivation: 'Please talk to me!',
        student: 1
      }
    },
    roles: {
      '1': { id: 1, type: 'admin', permissions: ['read_all'], users: [1] },
      '2': { id: 2, type: 'zzz', permissions: ['read_users'], users: [1] }
    },
    companies: {
      '1': { id: 1, name: 'Spotify', entries: [1, 2, 3] },
      '2': { id: 2, name: 'Google', entries: [4, 5] }
    },
    categories: {
      '1': { title: 'Logistik', id: 1, attributes: [1, 2] },
      '2': { title: 'Avtal', id: 2, attributes: [] }
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
    },
    statistics: {}
  },
  auth: {
    error: false,
    isLoggedIn: true,
    forgotPassword: { validKey: false }
  },
  form: {},
  current: { user: 1 }
};

const route = path => (
  <Provider store={createMockStore(state)}>
    <MemoryRouter initialEntries={[path]}>
      <Route component={ConnectedApp} />
    </MemoryRouter>
  </Provider>
);

const found = wrapper => expect(wrapper.find(NotFound)).toHaveLength(0);

it('renders routes without crashing', () => {
  found(mount(route('/')));
  found(mount(route('/info')));
  found(mount(route('/admin/categories')));
  found(mount(route('/admin/categories/1')));
  found(mount(route('/admin/companies')));
  found(mount(route('/admin/companies/new')));
  found(mount(route('/admin/companies/1')));
  found(mount(route('/admin/companies/1/edit')));
  found(mount(route('/admin/users')));
  found(mount(route('/admin/users/1')));
  found(mount(route('/admin/roles')));
  found(mount(route('/admin/roles/1')));
  found(mount(route('/admin/statistics')));
  found(mount(route('/login')));
  found(mount(route('/logout')));
  found(mount(route('/signup')));
  found(mount(route('/forgot-password')));
  found(mount(route('/user')));
  found(mount(route('/session')));
  found(mount(route('/session/application')));
  found(mount(route('/session/applications')));
  found(mount(route('/session/companies')));
  expect(mount(route('/invalid-path')).find(NotFound)).toHaveLength(1);
});
