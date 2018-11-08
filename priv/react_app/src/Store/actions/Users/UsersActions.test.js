import { Actions, actionTypes } from '../..';
import { mockHttpResponse, createMockStore } from '../../../TestHelper';

describe('get current user start', () => {
  it('should create an empty action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_CURRENT_USER
    };
    expect(Actions.users.getCurrentUserIsLoading()).toEqual(expectedAction);
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
      expect(calledActions[0]).toEqual(Actions.users.getCurrentUserIsLoading());
    });
  });

  it('should call success action on success', () => {
    const testUser = { id: '1', name: 'Test User' };
    const httpResponseBody = {
      data: testUser
    };
    mockHttpResponse({ status: 200, body: httpResponseBody });

    const expectedActions = [
      Actions.users.getCurrentUserIsLoading(),
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
      Actions.users.getCurrentUserIsLoading(),
      Actions.users.getCurrentUserFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.users.getCurrentUser()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

describe('getCurrentUserIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_CURRENT_USER
    };
    const action = Actions.users.getCurrentUserIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('getCurrentUserSuccess', () => {
  it('should create the correct action', () => {
    const testCurrentUser = {
      name: 'CurrentUser1'
    };

    const expectedAction = {
      type: actionTypes.FETCH_CURRENT_USER_SUCCESS,
      user: testCurrentUser
    };
    const action = Actions.users.getCurrentUserSuccess(testCurrentUser);
    expect(action).toEqual(expectedAction);
  });
});

describe('getCurrentUserFailure', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_CURRENT_USER_FAILURE
    };
    const action = Actions.users.getCurrentUserFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('getCurrentUser', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();

    return store.dispatch(Actions.users.getCurrentUser()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(Actions.users.getCurrentUserIsLoading());
    });
  });

  it('should call success action on success', () => {
    const user = {
      name: 'CurrentUser1'
    };
    mockHttpResponse({ status: 200, body: { data: user } });

    const expectedActions = [
      Actions.users.getCurrentUserIsLoading(),
      Actions.users.getCurrentUserSuccess(user)
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
      Actions.users.getCurrentUserIsLoading(),
      Actions.users.getCurrentUserFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.users.getCurrentUser()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

describe('updateCurrentUserIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.PUT_CURRENT_USER
    };
    const action = Actions.users.updateCurrentUserIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('updateCurrentUserSuccess', () => {
  it('should create the correct action', () => {
    const testCurrentUser = {
      name: 'CurrentUser1'
    };

    const expectedAction = {
      type: actionTypes.PUT_CURRENT_USER_SUCCESS,
      user: testCurrentUser
    };
    const action = Actions.users.updateCurrentUserSuccess(testCurrentUser);
    expect(action).toEqual(expectedAction);
  });
});

describe('updateCurrentUserFailure', () => {
  it('should update the correct action', () => {
    const expectedAction = {
      type: actionTypes.PUT_CURRENT_USER_FAILURE
    };
    const action = Actions.users.updateCurrentUserFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('updateCurrentUser', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();
    const data = { user: { name: 'Test CurrentUser' } };

    return store.dispatch(Actions.users.updateCurrentUser(data)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(
        Actions.users.updateCurrentUserIsLoading()
      );
    });
  });

  it('should call success action on success', () => {
    const user = {
      name: 'CurrentUser1'
    };
    mockHttpResponse({ status: 200, body: { data: user } });

    const expectedActions = [
      Actions.users.updateCurrentUserIsLoading(),
      Actions.users.updateCurrentUserSuccess(user)
    ];

    const store = createMockStore();
    const data = { user };

    return store.dispatch(Actions.users.updateCurrentUser(data)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });
    const data = { user: { name: 'Test CurrentUser' } };

    const expectedActions = [
      Actions.users.updateCurrentUserIsLoading(),
      Actions.users.updateCurrentUserFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.users.updateCurrentUser(data)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

describe('deleteCurrentUserIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.DELETE_CURRENT_USER
    };
    const action = Actions.users.deleteCurrentUserIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('deleteCurrentUserSuccess', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.DELETE_CURRENT_USER_SUCCESS
    };
    const action = Actions.users.deleteCurrentUserSuccess();
    expect(action).toEqual(expectedAction);
  });
});

describe('deleteCurrentUserFailure', () => {
  it('should delete the correct action', () => {
    const expectedAction = {
      type: actionTypes.DELETE_CURRENT_USER_FAILURE
    };
    const action = Actions.users.deleteCurrentUserFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('deleteCurrentUser', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();

    return store.dispatch(Actions.users.deleteCurrentUser()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(
        Actions.users.deleteCurrentUserIsLoading()
      );
    });
  });

  it('should call success action on success', () => {
    const userId = '1';
    mockHttpResponse({ status: 200, body: { data: userId } });

    const expectedActions = [
      Actions.users.deleteCurrentUserIsLoading(),
      Actions.users.deleteCurrentUserSuccess()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.users.deleteCurrentUser()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });
    const expectedActions = [
      Actions.users.deleteCurrentUserIsLoading(),
      Actions.users.deleteCurrentUserFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.users.deleteCurrentUser()).then(() => {
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
        id: 1,
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

describe('createUserIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.POST_USER
    };
    const action = Actions.users.createUserIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('createUserSuccess', () => {
  it('should create the correct action', () => {
    const testUser = {
      name: 'User1'
    };

    const expectedAction = {
      type: actionTypes.POST_USER_SUCCESS,
      user: testUser
    };
    const action = Actions.users.createUserSuccess(testUser);
    expect(action).toEqual(expectedAction);
  });
});

describe('createUserFailure', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.POST_USER_FAILURE
    };
    const action = Actions.users.createUserFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('createUser', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();
    const data = { user: { name: 'Test User' } };

    return store.dispatch(Actions.users.createUser(data)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(Actions.users.createUserIsLoading());
    });
  });

  it('should call success action on success', () => {
    const user = {
      name: 'User1'
    };
    mockHttpResponse({ status: 200, body: { data: user } });

    const expectedActions = [
      Actions.users.createUserIsLoading(),
      Actions.users.createUserSuccess(user)
    ];

    const store = createMockStore();
    const data = { user };

    return store.dispatch(Actions.users.createUser(data)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });
    const data = { user: { name: 'Test User' } };

    const expectedActions = [
      Actions.users.createUserIsLoading(),
      Actions.users.createUserFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.users.createUser(data)).then(() => {
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

    return store.dispatch(Actions.users.getUser('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(Actions.users.getUserIsLoading());
    });
  });

  it('should call success action on success', () => {
    const user = {
      name: 'User1'
    };
    mockHttpResponse({ status: 200, body: { data: user } });

    const expectedActions = [
      Actions.users.getUserIsLoading(),
      Actions.users.getUserSuccess(user)
    ];

    const store = createMockStore();

    return store.dispatch(Actions.users.getUser('1')).then(() => {
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

    return store.dispatch(Actions.users.getUser('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

describe('updateUserIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.PUT_USER
    };
    const action = Actions.users.updateUserIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('updateUserSuccess', () => {
  it('should create the correct action', () => {
    const testUser = {
      name: 'User1'
    };

    const expectedAction = {
      type: actionTypes.PUT_USER_SUCCESS,
      user: testUser
    };
    const action = Actions.users.updateUserSuccess(testUser);
    expect(action).toEqual(expectedAction);
  });
});

describe('updateUserFailure', () => {
  it('should update the correct action', () => {
    const expectedAction = {
      type: actionTypes.PUT_USER_FAILURE
    };
    const action = Actions.users.updateUserFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('updateUser', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();
    const data = { user: { name: 'Test User' } };

    return store.dispatch(Actions.users.updateUser('1', data)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(Actions.users.updateUserIsLoading());
    });
  });

  it('should call success action on success', () => {
    const user = {
      name: 'User1'
    };
    mockHttpResponse({ status: 200, body: { data: user } });

    const expectedActions = [
      Actions.users.updateUserIsLoading(),
      Actions.users.updateUserSuccess(user)
    ];

    const store = createMockStore();
    const data = { user };

    return store.dispatch(Actions.users.updateUser('1', data)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });
    const data = { user: { name: 'Test User' } };

    const expectedActions = [
      Actions.users.updateUserIsLoading(),
      Actions.users.updateUserFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.users.updateUser('1', data)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

describe('deleteUserIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.DELETE_USER
    };
    const action = Actions.users.deleteUserIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('deleteUserSuccess', () => {
  it('should create the correct action', () => {
    const testUser = {
      id: '1',
      name: 'User1'
    };

    const expectedAction = {
      type: actionTypes.DELETE_USER_SUCCESS,
      id: testUser.id
    };
    const action = Actions.users.deleteUserSuccess(testUser.id);
    expect(action).toEqual(expectedAction);
  });
});

describe('deleteUserFailure', () => {
  it('should delete the correct action', () => {
    const expectedAction = {
      type: actionTypes.DELETE_USER_FAILURE
    };
    const action = Actions.users.deleteUserFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('deleteUser', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();

    return store.dispatch(Actions.users.deleteUser('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(Actions.users.deleteUserIsLoading());
    });
  });

  it('should call success action on success', () => {
    const user = {
      id: '1',
      name: 'User1'
    };
    mockHttpResponse({ status: 200, body: '' });

    const expectedActions = [
      Actions.users.deleteUserIsLoading(),
      Actions.users.deleteUserSuccess(user.id)
    ];

    const store = createMockStore();

    return store.dispatch(Actions.users.deleteUser('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });
    const expectedActions = [
      Actions.users.deleteUserIsLoading(),
      Actions.users.deleteUserFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.users.deleteUser('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});
