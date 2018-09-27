import { Actions, actionTypes } from '../..';
import { mockHttpResponse, createMockStore } from '../../../TestHelper';

describe('createStudentSessionApplIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.POST_STUDENT_SESSION_APPL
    };
    const action = Actions.studentSessions.createStudentSessionApplIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('createStudentSessionApplSuccess', () => {
  it('should create the correct action', () => {
    const user = {
      name: 'Test User'
    };

    const expectedAction = {
      type: actionTypes.POST_STUDENT_SESSION_APPL_SUCCESS,
      user
    };
    const action = Actions.studentSessions.createStudentSessionApplSuccess(
      user
    );
    expect(action).toEqual(expectedAction);
  });
});

describe('createStudentSessionApplFailure', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.POST_STUDENT_SESSION_APPL_FAILURE
    };
    const action = Actions.studentSessions.createStudentSessionApplFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('createStudentSessionAppl', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();
    const data = { application: { name: 'Test StudentSessionAppl' } };

    return store
      .dispatch(Actions.studentSessions.createStudentSessionAppl(data))
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions[0]).toEqual(
          Actions.studentSessions.createStudentSessionApplIsLoading()
        );
      });
  });

  it('should call success action on success', () => {
    const application = [
      {
        name: 'StudentSessionAppl1'
      }
    ];
    mockHttpResponse({ status: 200, body: { data: application } });

    const expectedActions = [
      Actions.studentSessions.createStudentSessionApplIsLoading(),
      Actions.studentSessions.createStudentSessionApplSuccess(application)
    ];

    const store = createMockStore();
    const data = { application };

    return store
      .dispatch(Actions.studentSessions.createStudentSessionAppl(data))
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });
    const data = { application: { name: 'Test StudentSessionAppl' } };

    const expectedActions = [
      Actions.studentSessions.createStudentSessionApplIsLoading(),
      Actions.studentSessions.createStudentSessionApplFailure()
    ];

    const store = createMockStore();

    return store
      .dispatch(Actions.studentSessions.createStudentSessionAppl(data))
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });
});
