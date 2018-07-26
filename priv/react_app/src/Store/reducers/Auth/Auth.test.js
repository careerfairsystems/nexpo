import { Actions, actionTypes } from '../..';
import { getJwt, setJwt } from '../../../Util/JwtHelper';
import { AuthReducer } from './Auth';

it('should return initial state', () => {
  const expected = {
    error: false,
    isLoggedIn: false,
    forgotPassword: {
      validKey: false
    }
  };
  expect(AuthReducer(undefined, {})).toEqual(expected);
});

describe('get current user success', () => {
  it('should change state so it is logged in', () => {
    const action = Actions.users.getCurrentUserSuccess();
    const state = AuthReducer(undefined, action);
    expect(state).toMatchObject({ isLoggedIn: true });
  });
});

describe('get current user failure', () => {
  it('should change state so it is NOT logged in', () => {
    const action = Actions.users.getCurrentUserFailure();
    const state = AuthReducer({ isLoggedIn: true }, action);
    expect(state).toMatchObject({ isLoggedIn: false });
  });
});

describe(actionTypes.LOGIN_SUCCESS, () => {
  const action = {
    type: actionTypes.LOGIN_SUCCESS,
    jwt: 'randomly-generated-string'
  };

  it('should set isLoggedIn to true', () => {
    const testState = AuthReducer(undefined, action);
    expect(testState).toMatchObject({ isLoggedIn: true });
  });

  it('should set global jwt', () => {
    const testState = AuthReducer(undefined, action);
    expect(getJwt()).toBe(action.jwt);
  });
});

describe(actionTypes.LOGIN_FAILURE, () => {
  const action = {
    type: actionTypes.LOGIN_FAILURE
  };

  it('should set error to true', () => {
    const testState = AuthReducer(undefined, action);
    expect(testState).toMatchObject({ error: true });
  });

  it('should not set isLoggedIn to true', () => {
    const testState = AuthReducer(undefined, action);
    expect(testState).toMatchObject({ isLoggedIn: false });
  });

  it('should remove global jwt', () => {
    const jwt = 'random-string';
    setJwt(jwt);
    const testState = AuthReducer(undefined, action);
    expect(getJwt()).toBe('');
  });
});

describe('logout', () => {
  it('updates state and removes the JWT', () => {
    const jwt = 'random-string';
    setJwt(jwt);
    const state = AuthReducer({ isLoggedIn: true }, Actions.auth.logout());
    expect(state).toMatchObject({ isLoggedIn: false });
    expect(getJwt()).not.toBe(jwt);
  });
});

describe('verify forgot password key success', () => {
  it('should set validKey to true', () => {
    const init_state = {
      forgotPassword: { validKey: false }
    };
    const action = Actions.accounts.verify_forgot_password_key_success();
    const state = AuthReducer(init_state, action);

    const expected = {
      forgotPassword: { validKey: true }
    };
    expect(state).toMatchObject(expected);
  });
});

describe('verify forgot password key failure', () => {
  it('should set validKey to false', () => {
    const init_state = {
      forgotPassword: { validKey: true }
    };
    const action = Actions.accounts.verify_forgot_password_key_failure();
    const state = AuthReducer(init_state, action);

    const expected = {
      forgotPassword: { validKey: false }
    };
    expect(state).toMatchObject(expected);
  });
});
