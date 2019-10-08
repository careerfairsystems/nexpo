import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import DevelopmentLogin from './DevelopmentLogin';

it('should render without crashing', () => {
  const props = {
    isLoggedIn: false,
    login: jest.fn(),
    location: { state: {}, hash: '', pathname: '', search: '' }
  };
  // MemoryRouter should give location? But gives prop-type error `location`
  shallow(
    <MemoryRouter>
      <DevelopmentLogin {...props} />
    </MemoryRouter>
  );
});
it('should call login with correct parameters', () => {
  const props = {
    isLoggedIn: false,
    login: jest.fn(),
    location: { state: {}, hash: '', pathname: '', search: '' }
  };
  const wrapper = shallow(<DevelopmentLogin {...props} />);
  expect(props.login).toHaveBeenCalledTimes(0);
  const email = 'admin@test';
  wrapper.instance().login({ email });
  expect(props.login).toHaveBeenCalledTimes(1);
  expect(props.login).lastCalledWith({ email });
});
