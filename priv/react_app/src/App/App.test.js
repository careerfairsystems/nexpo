import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './App';
import { createMockStore } from '../TestHelper';

it('renders without crashing', () => {
  shallow(
    <App
      isLoggedIn={false}
      currentUser={{}}
      logout={() => console.log('logout')}
    />
  );
});

const state = {
  api: {
    categories: { fetching: false, success: false },
    companies: { fetching: false, success: false },
    current_user: { fetching: false, success: false },
    forgot_password: { fetching: false, success: false },
    login: { fetching: false, success: false },
    replace_password: { fetching: false, success: false },
    verify_forgot_password_key: { fetching: false, success: false }
  },
  entities: {
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
    }
  },
  auth: {
    error: false,
    isLoggedIn: false,
    forgotPassword: { validKey: false }
  },
  current: {}
};

const route = path => (
  <Provider store={createMockStore(state)}>
    <MuiThemeProvider>
      <MemoryRouter initialEntries={[path]}>
        <App isLoggedIn={false} currentUser={{}} logout={() => null} />
      </MemoryRouter>
    </MuiThemeProvider>
  </Provider>
);

it('renders routes without crashing', () => {
  mount(route('/categories'));
  mount(route('/companies'));
  mount(route('/login'));
  mount(route('/signup'));
  mount(route('/forgot-password'));
  mount(route('/invalid-path'));
});
