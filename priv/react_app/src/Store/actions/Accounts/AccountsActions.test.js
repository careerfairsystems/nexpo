import { Actions, actionTypes } from '../..';
import { mockHttpResponse, createMockStore } from '../../../TestHelper';

describe('forgotPasswordRequest', () => {
  it('should create the correct action', () => {
    const expected = {
      type: actionTypes.FORGOT_PASSWORD_REQUEST
    };
    const action = Actions.accounts.forgotPasswordRequest();
    expect(action).toEqual(expected);
  });
});

describe('forgotPasswordSuccess', () => {
  it('should create the correct action', () => {
    const expected = {
      type: actionTypes.FORGOT_PASSWORD_SUCCESS
    };
    const action = Actions.accounts.forgotPasswordSuccess();
    expect(action).toEqual(expected);
  });
});

describe('forgot_password', () => {
  it('should call request and success', () => {
    const expectedActions = [
      Actions.accounts.forgotPasswordRequest(),
      Actions.accounts.forgotPasswordSuccess()
    ];
    mockHttpResponse({
      status: 200
    });

    const store = createMockStore();

    expect.assertions(1);
    return store.dispatch(Actions.accounts.forgot_password({})).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

describe('verify_forgot_password_key_request', () => {
  it('should create the correct action', () => {
    const expected = {
      type: actionTypes.VERIFY_FORGOT_PASSWORD_KEY_REQUEST
    };
    const action = Actions.accounts.verify_forgot_password_key_request();
    expect(action).toEqual(expected);
  });
});

describe('verify_forgot_password_key_success', () => {
  it('should create the correct action', () => {
    const expected = {
      type: actionTypes.VERIFY_FORGOT_PASSWORD_KEY_SUCCESS
    };
    const action = Actions.accounts.verify_forgot_password_key_success();
    expect(action).toEqual(expected);
  });
});

describe('verify_forgot_password_key_failure', () => {
  it('should create the correct action', () => {
    const expected = {
      type: actionTypes.VERIFY_FORGOT_PASSWORD_KEY_FAILURE
    };
    const action = Actions.accounts.verify_forgot_password_key_failure();
    expect(action).toEqual(expected);
  });
});

describe('verify_forgot_password_key', () => {
  it('should call request and success on success', () => {
    const expectedActions = [
      Actions.accounts.verify_forgot_password_key_request(),
      Actions.accounts.verify_forgot_password_key_success()
    ];
    mockHttpResponse({
      status: 200,
      response: { success: 'true' }
    });

    const store = createMockStore();
    expect.assertions(1);

    const params = { key: 'random-string' };
    return store
      .dispatch(Actions.accounts.verify_forgot_password_key(params))
      .then(res => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('should call request and failure on failure', () => {
    const expectedActions = [
      Actions.accounts.verify_forgot_password_key_request(),
      Actions.accounts.verify_forgot_password_key_failure()
    ];
    mockHttpResponse({
      status: 404,
      response: { success: 'false' }
    });

    const store = createMockStore();
    expect.assertions(1);

    const params = { key: 'random-string' };
    return store
      .dispatch(Actions.accounts.verify_forgot_password_key(params))
      .then(res => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });
});

describe('replaceForgottenPasswordRequest', () => {
  it('should create the correct action', () => {
    const expected = {
      type: actionTypes.REPLACE_FORGOTTEN_PASSWORD_REQUEST
    };
    const action = Actions.accounts.replaceForgottenPasswordRequest();
    expect(action).toEqual(expected);
  });
});

describe('replaceForgottenPasswordSuccess', () => {
  it('should create the correct action', () => {
    const expected = {
      type: actionTypes.REPLACE_FORGOTTEN_PASSWORD_SUCCESS
    };
    const action = Actions.accounts.replaceForgottenPasswordSuccess();
    expect(action).toEqual(expected);
  });
});

describe('replaceForgottenPasswordFailure', () => {
  it('should create the correct action', () => {
    const errors = {
      password: 'some-error'
    };
    const expected = {
      type: actionTypes.REPLACE_FORGOTTEN_PASSWORD_FAILURE,
      errors
    };
    const action = Actions.accounts.replaceForgottenPasswordFailure(errors);
    expect(action).toEqual(expected);
  });
});

describe('replace_forgotten_password', () => {
  it('should call request and success on http success', () => {
    mockHttpResponse({
      status: 200
    });
    const store = createMockStore();
    expect.assertions(1);

    const expected = [
      Actions.accounts.replaceForgottenPasswordRequest(),
      Actions.accounts.replaceForgottenPasswordSuccess()
    ];
    const params = {
      key: 'random-string',
      password: 'some-password',
      password_confirmation: 'some-password'
    };
    return store
      .dispatch(Actions.accounts.replace_forgotten_password(params))
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expected);
      });
  });

  it('should call request and failure on http failure', () => {
    mockHttpResponse({
      status: 400
    });
    const store = createMockStore();
    expect.assertions(1);

    const expected = [
      Actions.accounts.replaceForgottenPasswordRequest(),
      Actions.accounts.replaceForgottenPasswordFailure()
    ];
    const params = {
      key: 'random-string',
      password: 'some-password',
      password_confirmation: 'some-other-password'
    };
    return store
      .dispatch(Actions.accounts.replace_forgotten_password(params))
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expected);
      });
  });
});
