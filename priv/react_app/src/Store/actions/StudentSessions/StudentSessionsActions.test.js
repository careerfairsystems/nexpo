import { Actions, actionTypes } from '../..';
import { mockHttpResponse, createMockStore } from '../../../TestHelper';

describe('createStudentSessionApplIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.POST_STUDENT_SESSION_APPL
    };
    const action = Actions.studentSession.createStudentSessionApplIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('createStudentSessionApplSuccess', () => {
  it('should create the correct action', () => {
    const testStudentSessionAppl = {
      name: 'StudentSessionAppl1'
    };

    const expectedAction = {
      type: actionTypes.POST_STUDENT_SESSION_APPL_SUCCESS,
      role: testStudentSessionAppl
    };
    const action = Actions.studentSession.createStudentSessionApplSuccess(
      testStudentSessionAppl
    );
    expect(action).toEqual(expectedAction);
  });
});

describe('createStudentSessionApplFailure', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.POST_STUDENT_SESSION_APPL_FAILURE
    };
    const action = Actions.studentSession.createStudentSessionApplFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('createStudentSessionAppl', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();
    const data = { role: { name: 'Test StudentSessionAppl' } };

    return store
      .dispatch(Actions.studentSession.createStudentSessionAppl(data))
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions[0]).toEqual(
          Actions.studentSession.createStudentSessionApplIsLoading()
        );
      });
  });

  it('should call success action on success', () => {
    const role = [
      {
        name: 'StudentSessionAppl1'
      }
    ];
    mockHttpResponse({ status: 200, body: { data: role } });

    const expectedActions = [
      Actions.studentSession.createStudentSessionApplIsLoading(),
      Actions.studentSession.createStudentSessionApplSuccess(role)
    ];

    const store = createMockStore();
    const data = { role };

    return store
      .dispatch(Actions.studentSession.createStudentSessionAppl(data))
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });
    const data = { role: { name: 'Test StudentSessionAppl' } };

    const expectedActions = [
      Actions.studentSession.createStudentSessionApplIsLoading(),
      Actions.studentSession.createStudentSessionApplFailure()
    ];

    const store = createMockStore();

    return store
      .dispatch(Actions.studentSession.createStudentSessionAppl(data))
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });
});
