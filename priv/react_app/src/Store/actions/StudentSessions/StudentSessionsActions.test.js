import { Actions, actionTypes } from '../..';
import { mockHttpResponse, createMockStore } from '../../../TestHelper';

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
    const role = [
      {
        name: 'Role1'
      }
    ];
    mockHttpResponse({ status: 200, body: { data: role } });

    const expectedActions = [
      Actions.roles.createRoleIsLoading(),
      Actions.roles.createRoleSuccess(role)
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
