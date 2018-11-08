import { Actions, actionTypes } from '../..';
import { mockHttpResponse, createMockStore } from '../../../TestHelper';

describe('getAllDeadlinesIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_DEADLINES
    };
    const action = Actions.deadlines.getAllDeadlinesIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('getAllDeadlinesSuccess', () => {
  it('should create the correct action', () => {
    const testDeadlines = [
      {
        name: 'Deadline1'
      }
    ];

    const expectedAction = {
      type: actionTypes.FETCH_DEADLINES_SUCCESS,
      deadlines: testDeadlines
    };
    const action = Actions.deadlines.getAllDeadlinesSuccess(testDeadlines);
    expect(action).toEqual(expectedAction);
  });
});

describe('getAllDeadlinesFailure', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_DEADLINES_FAILURE
    };
    const action = Actions.deadlines.getAllDeadlinesFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('getAllDeadlines', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();

    return store.dispatch(Actions.deadlines.getAllDeadlines()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(
        Actions.deadlines.getAllDeadlinesIsLoading()
      );
    });
  });

  it('should call success action on success', () => {
    const deadlines = [
      {
        name: 'Deadline1'
      }
    ];
    mockHttpResponse({ status: 200, body: { data: deadlines } });

    const expectedActions = [
      Actions.deadlines.getAllDeadlinesIsLoading(),
      Actions.deadlines.getAllDeadlinesSuccess(deadlines)
    ];

    const store = createMockStore();

    return store.dispatch(Actions.deadlines.getAllDeadlines()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });

    const expectedActions = [
      Actions.deadlines.getAllDeadlinesIsLoading(),
      Actions.deadlines.getAllDeadlinesFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.deadlines.getAllDeadlines()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

describe('createDeadlineIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.POST_DEADLINE
    };
    const action = Actions.deadlines.createDeadlineIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('createDeadlineSuccess', () => {
  it('should create the correct action', () => {
    const testDeadline = {
      name: 'Deadline1'
    };

    const expectedAction = {
      type: actionTypes.POST_DEADLINE_SUCCESS,
      deadline: testDeadline
    };
    const action = Actions.deadlines.createDeadlineSuccess(testDeadline);
    expect(action).toEqual(expectedAction);
  });
});

describe('createDeadlineFailure', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.POST_DEADLINE_FAILURE
    };
    const action = Actions.deadlines.createDeadlineFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('createDeadline', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();
    const data = { deadline: { name: 'Test Deadline' } };

    return store.dispatch(Actions.deadlines.createDeadline(data)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(
        Actions.deadlines.createDeadlineIsLoading()
      );
    });
  });

  it('should call success action on success', () => {
    const deadline = {
      name: 'Deadline1'
    };
    mockHttpResponse({ status: 200, body: { data: deadline } });

    const expectedActions = [
      Actions.deadlines.createDeadlineIsLoading(),
      Actions.deadlines.createDeadlineSuccess(deadline)
    ];

    const store = createMockStore();
    const data = { deadline };

    return store.dispatch(Actions.deadlines.createDeadline(data)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });
    const data = { deadline: { name: 'Test Deadline' } };

    const expectedActions = [
      Actions.deadlines.createDeadlineIsLoading(),
      Actions.deadlines.createDeadlineFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.deadlines.createDeadline(data)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

describe('getDeadlineIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_DEADLINE
    };
    const action = Actions.deadlines.getDeadlineIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('getDeadlineSuccess', () => {
  it('should create the correct action', () => {
    const testDeadline = {
      name: 'Deadline1'
    };

    const expectedAction = {
      type: actionTypes.FETCH_DEADLINE_SUCCESS,
      deadline: testDeadline
    };
    const action = Actions.deadlines.getDeadlineSuccess(testDeadline);
    expect(action).toEqual(expectedAction);
  });
});

describe('getDeadlineFailure', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_DEADLINE_FAILURE
    };
    const action = Actions.deadlines.getDeadlineFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('getDeadline', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();

    return store.dispatch(Actions.deadlines.getDeadline('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(
        Actions.deadlines.getDeadlineIsLoading()
      );
    });
  });

  it('should call success action on success', () => {
    const deadline = {
      name: 'Deadline1'
    };
    mockHttpResponse({ status: 200, body: { data: deadline } });

    const expectedActions = [
      Actions.deadlines.getDeadlineIsLoading(),
      Actions.deadlines.getDeadlineSuccess(deadline)
    ];

    const store = createMockStore();

    return store.dispatch(Actions.deadlines.getDeadline('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });

    const expectedActions = [
      Actions.deadlines.getDeadlineIsLoading(),
      Actions.deadlines.getDeadlineFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.deadlines.getDeadline('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

describe('updateDeadlineIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.PUT_DEADLINE
    };
    const action = Actions.deadlines.updateDeadlineIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('updateDeadlineSuccess', () => {
  it('should create the correct action', () => {
    const testDeadline = {
      name: 'Deadline1'
    };

    const expectedAction = {
      type: actionTypes.PUT_DEADLINE_SUCCESS,
      deadline: testDeadline
    };
    const action = Actions.deadlines.updateDeadlineSuccess(testDeadline);
    expect(action).toEqual(expectedAction);
  });
});

describe('updateDeadlineFailure', () => {
  it('should update the correct action', () => {
    const expectedAction = {
      type: actionTypes.PUT_DEADLINE_FAILURE
    };
    const action = Actions.deadlines.updateDeadlineFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('updateDeadline', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();
    const data = { deadline: { name: 'Test Deadline' } };

    return store
      .dispatch(Actions.deadlines.updateDeadline('1', data))
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions[0]).toEqual(
          Actions.deadlines.updateDeadlineIsLoading()
        );
      });
  });

  it('should call success action on success', () => {
    const deadline = {
      name: 'Deadline1'
    };
    mockHttpResponse({ status: 200, body: { data: deadline } });

    const expectedActions = [
      Actions.deadlines.updateDeadlineIsLoading(),
      Actions.deadlines.updateDeadlineSuccess(deadline)
    ];

    const store = createMockStore();
    const data = { deadline };

    return store
      .dispatch(Actions.deadlines.updateDeadline('1', data))
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });
    const data = { deadline: { name: 'Test Deadline' } };

    const expectedActions = [
      Actions.deadlines.updateDeadlineIsLoading(),
      Actions.deadlines.updateDeadlineFailure()
    ];

    const store = createMockStore();

    return store
      .dispatch(Actions.deadlines.updateDeadline('1', data))
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });
});

describe('deleteDeadlineIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.DELETE_DEADLINE
    };
    const action = Actions.deadlines.deleteDeadlineIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('deleteDeadlineSuccess', () => {
  it('should create the correct action', () => {
    const testDeadline = {
      id: '1',
      name: 'Deadline1'
    };

    const expectedAction = {
      type: actionTypes.DELETE_DEADLINE_SUCCESS,
      id: testDeadline.id
    };
    const action = Actions.deadlines.deleteDeadlineSuccess(testDeadline.id);
    expect(action).toEqual(expectedAction);
  });
});

describe('deleteDeadlineFailure', () => {
  it('should delete the correct action', () => {
    const expectedAction = {
      type: actionTypes.DELETE_DEADLINE_FAILURE
    };
    const action = Actions.deadlines.deleteDeadlineFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('deleteDeadline', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();

    return store.dispatch(Actions.deadlines.deleteDeadline('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(
        Actions.deadlines.deleteDeadlineIsLoading()
      );
    });
  });

  it('should call success action on success', () => {
    const deadline = {
      id: '1',
      name: 'Deadline1'
    };
    mockHttpResponse({ status: 200, body: '' });

    const expectedActions = [
      Actions.deadlines.deleteDeadlineIsLoading(),
      Actions.deadlines.deleteDeadlineSuccess(deadline.id)
    ];

    const store = createMockStore();

    return store.dispatch(Actions.deadlines.deleteDeadline('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });
    const expectedActions = [
      Actions.deadlines.deleteDeadlineIsLoading(),
      Actions.deadlines.deleteDeadlineFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.deadlines.deleteDeadline('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});
