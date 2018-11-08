import { reset } from 'redux-form';
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

describe('createRoleIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.POST_ROLE
    };
    const action = Actions.roles.createRoleIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('createRoleSuccess', () => {
  it('should create the correct action', () => {
    const testRole = {
      name: 'Role1'
    };

    const expectedAction = {
      type: actionTypes.POST_ROLE_SUCCESS,
      role: testRole
    };
    const action = Actions.roles.createRoleSuccess(testRole);
    expect(action).toEqual(expectedAction);
  });
});

describe('createRoleFailure', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.POST_ROLE_FAILURE
    };
    const action = Actions.roles.createRoleFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('createRole', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();
    const data = { role: { name: 'Test Role' } };

    return store.dispatch(Actions.roles.createRole(data)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(Actions.roles.createRoleIsLoading());
    });
  });

  it('should call success action on success', () => {
    const role = {
      name: 'Role1'
    };
    mockHttpResponse({ status: 200, body: { data: role } });

    const expectedActions = [
      Actions.roles.createRoleIsLoading(),
      Actions.roles.createRoleSuccess(role),
      reset('role')
    ];

    const store = createMockStore();
    const data = { role };

    return store.dispatch(Actions.roles.createRole(data)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });
    const data = { role: { name: 'Test Role' } };

    const expectedActions = [
      Actions.roles.createRoleIsLoading(),
      Actions.roles.createRoleFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.roles.createRole(data)).then(() => {
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
      id: 1,
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

    return store.dispatch(Actions.roles.getRole('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(Actions.roles.getRoleIsLoading());
    });
  });

  it('should call success action on success', () => {
    const role = {
    id: 1,
      name: 'Role1'
    };
    mockHttpResponse({ status: 200, body: { data: role } });

    const expectedActions = [
      Actions.roles.getRoleIsLoading(),
      Actions.roles.getRoleSuccess(role)
    ];

    const store = createMockStore();

    return store.dispatch(Actions.roles.getRole('1')).then(() => {
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

    return store.dispatch(Actions.roles.getRole('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

describe('updateRoleIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.PUT_ROLE
    };
    const action = Actions.roles.updateRoleIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('updateRoleSuccess', () => {
  it('should create the correct action', () => {
    const testRole = {
      name: 'Role1'
    };

    const expectedAction = {
      type: actionTypes.PUT_ROLE_SUCCESS,
      role: testRole
    };
    const action = Actions.roles.updateRoleSuccess(testRole);
    expect(action).toEqual(expectedAction);
  });
});

describe('updateRoleFailure', () => {
  it('should update the correct action', () => {
    const expectedAction = {
      type: actionTypes.PUT_ROLE_FAILURE
    };
    const action = Actions.roles.updateRoleFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('updateRole', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();
    const data = { role: { name: 'Test Role' } };

    return store.dispatch(Actions.roles.updateRole('1', data)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(Actions.roles.updateRoleIsLoading());
    });
  });

  it('should call success action on success', () => {
    const role = {
      name: 'Role1'
    };
    mockHttpResponse({ status: 200, body: { data: role } });

    const expectedActions = [
      Actions.roles.updateRoleIsLoading(),
      Actions.roles.updateRoleSuccess(role)
    ];

    const store = createMockStore();
    const data = { role };

    return store.dispatch(Actions.roles.updateRole('1', data)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });
    const data = { role: { name: 'Test Role' } };

    const expectedActions = [
      Actions.roles.updateRoleIsLoading(),
      Actions.roles.updateRoleFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.roles.updateRole('1', data)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

describe('deleteRoleIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.DELETE_ROLE
    };
    const action = Actions.roles.deleteRoleIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('deleteRoleSuccess', () => {
  it('should create the correct action', () => {
    const testRoleId = '1';

    const expectedAction = {
      type: actionTypes.DELETE_ROLE_SUCCESS,
      id: testRoleId
    };
    const action = Actions.roles.deleteRoleSuccess(testRoleId);
    expect(action).toEqual(expectedAction);
  });
});

describe('deleteRoleFailure', () => {
  it('should delete the correct action', () => {
    const expectedAction = {
      type: actionTypes.DELETE_ROLE_FAILURE
    };
    const action = Actions.roles.deleteRoleFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('deleteRole', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();

    return store.dispatch(Actions.roles.deleteRole('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(Actions.roles.deleteRoleIsLoading());
    });
  });

  it('should call success action on success', () => {
    const roleId = '1';
    mockHttpResponse({ status: 200, body: { data: roleId } });

    const expectedActions = [
      Actions.roles.deleteRoleIsLoading(),
      Actions.roles.deleteRoleSuccess(roleId)
    ];

    const store = createMockStore();

    return store.dispatch(Actions.roles.deleteRole('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });
    const expectedActions = [
      Actions.roles.deleteRoleIsLoading(),
      Actions.roles.deleteRoleFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.roles.deleteRole('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});
