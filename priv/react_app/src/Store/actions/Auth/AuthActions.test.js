import { Actions, actionTypes } from '../..';
import { mockHttpResponse, createMockStore } from '../../../TestHelper';

describe('login success', () => {
  it('should create an action with a jwt', () => {
    const jwt = 'random string';
    const expectedAction = {
      type: actionTypes.LOGIN_SUCCESS,
      jwt
    };
    expect(Actions.auth.loginSuccess(jwt)).toEqual(expectedAction);
  });
});

describe('login failure', () => {
  it('should create an action without a payload', () => {
    const expectedAction = { type: actionTypes.LOGIN_FAILURE };
    expect(Actions.auth.loginFailure()).toEqual(expectedAction);
  });
});

describe('logout', () => {
  it('should create the correct action', () => {
    const expectedAction = { type: actionTypes.LOGOUT };
    expect(Actions.auth.logout()).toEqual(expectedAction);
  });
});

/**
 * I get network failure. How do I use nock?
 * /Joel
 */

describe('login action', () => {
  it('should call success action and get the logged in user', () => {
    const jwt = 'random-string';
    const expectedActions = [
      Actions.auth.loginSuccess(jwt),
      Actions.users.getCurrentUserIsLoading()
    ];

    const httpResponse = {
      data: { jwt }
    };
    mockHttpResponse({ status: 200, body: httpResponse });

    const store = createMockStore();
    const params = {
      email: 'test-user@student.lu.se',
      password: 'test-password'
    };
    return store.dispatch(Actions.auth.login(params)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('calls login failure on failure', () => {
    const expectedActions = [Actions.auth.loginFailure()];
    mockHttpResponse({ status: 401, body: {} });

    const store = createMockStore();
    const params = { email: 'test', password: 'test' };
    return store.dispatch(Actions.auth.login(params)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

describe('development login action', () => {
  it('should call success action and get the logged in user', () => {
    const jwt = 'random-string';
    const expectedActions = [
      Actions.auth.loginSuccess(jwt),
      Actions.users.getCurrentUserIsLoading()
    ];

    const httpResponse = {
      data: { jwt }
    };
    mockHttpResponse({ status: 200, body: httpResponse });

    const store = createMockStore();
    const params = { email: 'test-user@student.lu.se' };
    return store.dispatch(Actions.auth.developmentLogin(params)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('calls login failure on failure', () => {
    const expectedActions = [Actions.auth.loginFailure()];
    mockHttpResponse({ status: 401, body: {} });

    const store = createMockStore();
    const params = { email: 'test' };
    return store.dispatch(Actions.auth.developmentLogin(params)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});
