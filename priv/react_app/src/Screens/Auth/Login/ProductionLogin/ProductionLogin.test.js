import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import ProductionLogin from './ProductionLogin';

it('should render without crashing', () => {
  const props = {
    isLoggedIn: false,
    login: jest.fn(),
    location: { state: {}, hash: '', pathname: '', search: '' }
  };
  shallow(
    <MemoryRouter>
      <ProductionLogin {...props} />
    </MemoryRouter>
  );
});

it('should call login with correct values', () => {
  const props = {
    isLoggedIn: false,
    login: jest.fn(),
    location: { state: {}, hash: '', pathname: '', search: '' }
  };
  const wrapper = shallow(<ProductionLogin {...props} />);
  const email = 'admin@test';
  const password = 'plzDontHack123';
  expect(props.login).toHaveBeenCalledTimes(0);
  wrapper.instance().login({ email, password });
  expect(props.login).toHaveBeenCalledTimes(1);
  expect(props.login).lastCalledWith({ email, password });
});
