import { Actions, actionTypes } from '../..';
import { mockHttpResponse, createMockStore } from '../../../TestHelper';

describe('get current user start', () => {
  it('should create an empty action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_CURRENT_USER
    };
    expect(Actions.users.getCurrentUserStart()).toEqual(expectedAction);
  });
});

describe('get current user success', () => {
  it('should create the correct action', () => {
    const testUser = { name: 'TestUser' };
    const expectedAction = {
      type: actionTypes.FETCH_CURRENT_USER_SUCCESS,
      user: testUser
    };
    expect(Actions.users.getCurrentUserSuccess(testUser)).toEqual(
      expectedAction
    );
  });
});

describe('get current user failure', () => {
  it('should create an empty action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_CURRENT_USER_FAILURE
    };
    expect(Actions.users.getCurrentUserFailure()).toEqual(expectedAction);
  });
});

describe('get current user', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();

    return store.dispatch(Actions.users.getCurrentUser()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(Actions.users.getCurrentUserStart());
    });
  });

  it('should call success action on success', () => {
    const testUser = { id: 1, name: 'Test User' };
    const httpResponseBody = {
      data: testUser
    };
    mockHttpResponse({ status: 200, body: httpResponseBody });

    const expectedActions = [
      Actions.users.getCurrentUserStart(),
      Actions.users.getCurrentUserSuccess(testUser)
    ];

    const store = createMockStore();

    return store.dispatch(Actions.users.getCurrentUser()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });

    const expectedActions = [
      Actions.users.getCurrentUserStart(),
      Actions.users.getCurrentUserFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.users.getCurrentUser()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

describe('getAllUsersIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_USERS
    };
    const action = Actions.users.getAllUsersIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('getAllUsersSuccess', () => {
  it('should create the correct action', () => {
    const testUsers = [
      {
        name: 'User1'
      }
    ];

    const expectedAction = {
      type: actionTypes.FETCH_USERS_SUCCESS,
      users: testUsers
    };
    const action = Actions.users.getAllUsersSuccess(testUsers);
    expect(action).toEqual(expectedAction);
  });
});

describe('getAllUsersFailure', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_USERS_FAILURE
    };
    const action = Actions.users.getAllUsersFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('getAllUsers', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();

    return store.dispatch(Actions.users.getAllUsers()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(Actions.users.getAllUsersIsLoading());
    });
  });

  it('should call success action on success', () => {
    const users = [
      {
        name: 'User1'
      }
    ];
    mockHttpResponse({ status: 200, body: { data: users } });

    const expectedActions = [
      Actions.users.getAllUsersIsLoading(),
      Actions.users.getAllUsersSuccess(users)
    ];

    const store = createMockStore();

    return store.dispatch(Actions.users.getAllUsers()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });

    const expectedActions = [
      Actions.users.getAllUsersIsLoading(),
      Actions.users.getAllUsersFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.users.getAllUsers()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

describe('getUserIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_USER
    };
    const action = Actions.users.getUserIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('getUserSuccess', () => {
  it('should create the correct action', () => {
    const testUser = {
      name: 'User1'
    };

    const expectedAction = {
      type: actionTypes.FETCH_USER_SUCCESS,
      user: testUser
    };
    const action = Actions.users.getUserSuccess(testUser);
    expect(action).toEqual(expectedAction);
  });
});

describe('getUserFailure', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_USER_FAILURE
    };
    const action = Actions.users.getUserFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('getUser', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();

    return store.dispatch(Actions.users.getUser()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(Actions.users.getUserIsLoading());
    });
  });

  it('should call success action on success', () => {
    const user = [
      {
        name: 'User1'
      }
    ];
    mockHttpResponse({ status: 200, body: { data: user } });

    const expectedActions = [
      Actions.users.getUserIsLoading(),
      Actions.users.getUserSuccess(user)
    ];

    const store = createMockStore();

    return store.dispatch(Actions.users.getUser()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });

    const expectedActions = [
      Actions.users.getUserIsLoading(),
      Actions.users.getUserFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.users.getUser()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});
