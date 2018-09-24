import { Actions, actionTypes } from '../..';
import { mockHttpResponse, createMockStore } from '../../../TestHelper';

describe('getAllRolesIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_ROLES
    };
    const action = Actions.roles.getAllRolesIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('getAllRolesSuccess', () => {
  it('should create the correct action', () => {
    const testRoles = [
      {
        name: 'Role1'
      }
    ];

    const expectedAction = {
      type: actionTypes.FETCH_ROLES_SUCCESS,
      roles: testRoles
    };
    const action = Actions.roles.getAllRolesSuccess(testRoles);
    expect(action).toEqual(expectedAction);
  });
});

describe('getAllRolesFailure', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_ROLES_FAILURE
    };
    const action = Actions.roles.getAllRolesFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('getAllRoles', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();

    return store.dispatch(Actions.roles.getAllRoles()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(Actions.roles.getAllRolesIsLoading());
    });
  });

  it('should call success action on success', () => {
    const roles = [
      {
        name: 'Role1'
      }
    ];
    mockHttpResponse({ status: 200, body: { data: roles } });

    const expectedActions = [
      Actions.roles.getAllRolesIsLoading(),
      Actions.roles.getAllRolesSuccess(roles)
    ];

    const store = createMockStore();

    return store.dispatch(Actions.roles.getAllRoles()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });

    const expectedActions = [
      Actions.roles.getAllRolesIsLoading(),
      Actions.roles.getAllRolesFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.roles.getAllRoles()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

describe('getRoleIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_ROLE
    };
    const action = Actions.roles.getRoleIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('getRoleSuccess', () => {
  it('should create the correct action', () => {
    const testRole = {
      name: 'Role1'
    };

    const expectedAction = {
      type: actionTypes.FETCH_ROLE_SUCCESS,
      role: testRole
    };
    const action = Actions.roles.getRoleSuccess(testRole);
    expect(action).toEqual(expectedAction);
  });
});

describe('getRoleFailure', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_ROLE_FAILURE
    };
    const action = Actions.roles.getRoleFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('getRole', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();

    return store.dispatch(Actions.roles.getRole()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(Actions.roles.getRoleIsLoading());
    });
  });

  it('should call success action on success', () => {
    const role = [
      {
        name: 'Role1'
      }
    ];
    mockHttpResponse({ status: 200, body: { data: role } });

    const expectedActions = [
      Actions.roles.getRoleIsLoading(),
      Actions.roles.getRoleSuccess(role)
    ];

    const store = createMockStore();

    return store.dispatch(Actions.roles.getRole()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });

    const expectedActions = [
      Actions.roles.getRoleIsLoading(),
      Actions.roles.getRoleFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.roles.getRole()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});
