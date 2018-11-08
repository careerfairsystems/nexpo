import { Actions, actionTypes } from '../..';
import { mockHttpResponse, createMockStore } from '../../../TestHelper';

describe('getAllProgrammesIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_PROGRAMMES
    };
    const action = Actions.programmes.getAllProgrammesIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('getAllProgrammesSuccess', () => {
  it('should create the correct action', () => {
    const testProgrammes = [
      {
        name: 'Programme1'
      }
    ];

    const expectedAction = {
      type: actionTypes.FETCH_PROGRAMMES_SUCCESS,
      programmes: testProgrammes
    };
    const action = Actions.programmes.getAllProgrammesSuccess(testProgrammes);
    expect(action).toEqual(expectedAction);
  });
});

describe('getAllProgrammesFailure', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_PROGRAMMES_FAILURE
    };
    const action = Actions.programmes.getAllProgrammesFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('getAllProgrammes', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();

    return store.dispatch(Actions.programmes.getAllProgrammes()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(
        Actions.programmes.getAllProgrammesIsLoading()
      );
    });
  });

  it('should call success action on success', () => {
    const programmes = [
      {
        name: 'Programme1'
      }
    ];
    mockHttpResponse({ status: 200, body: { data: programmes } });

    const expectedActions = [
      Actions.programmes.getAllProgrammesIsLoading(),
      Actions.programmes.getAllProgrammesSuccess(programmes)
    ];

    const store = createMockStore();

    return store.dispatch(Actions.programmes.getAllProgrammes()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });

    const expectedActions = [
      Actions.programmes.getAllProgrammesIsLoading(),
      Actions.programmes.getAllProgrammesFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.programmes.getAllProgrammes()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

describe('createProgrammeIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.POST_PROGRAMME
    };
    const action = Actions.programmes.createProgrammeIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('createProgrammeSuccess', () => {
  it('should create the correct action', () => {
    const testProgramme = {
      name: 'Programme1'
    };

    const expectedAction = {
      type: actionTypes.POST_PROGRAMME_SUCCESS,
      programme: testProgramme
    };
    const action = Actions.programmes.createProgrammeSuccess(testProgramme);
    expect(action).toEqual(expectedAction);
  });
});

describe('createProgrammeFailure', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.POST_PROGRAMME_FAILURE
    };
    const action = Actions.programmes.createProgrammeFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('createProgramme', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();
    const data = { programme: { name: 'Test Programme' } };

    return store.dispatch(Actions.programmes.createProgramme(data)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(
        Actions.programmes.createProgrammeIsLoading()
      );
    });
  });

  it('should call success action on success', () => {
    const programme = {
      name: 'Programme1'
    };
    mockHttpResponse({ status: 200, body: { data: programme } });

    const expectedActions = [
      Actions.programmes.createProgrammeIsLoading(),
      Actions.programmes.createProgrammeSuccess(programme)
    ];

    const store = createMockStore();
    const data = { programme };

    return store.dispatch(Actions.programmes.createProgramme(data)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });
    const data = { programme: { name: 'Test Programme' } };

    const expectedActions = [
      Actions.programmes.createProgrammeIsLoading(),
      Actions.programmes.createProgrammeFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.programmes.createProgramme(data)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

describe('getProgrammeIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_PROGRAMME
    };
    const action = Actions.programmes.getProgrammeIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('getProgrammeSuccess', () => {
  it('should create the correct action', () => {
    const testProgramme = {
      name: 'Programme1'
    };

    const expectedAction = {
      type: actionTypes.FETCH_PROGRAMME_SUCCESS,
      programme: testProgramme
    };
    const action = Actions.programmes.getProgrammeSuccess(testProgramme);
    expect(action).toEqual(expectedAction);
  });
});

describe('getProgrammeFailure', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_PROGRAMME_FAILURE
    };
    const action = Actions.programmes.getProgrammeFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('getProgramme', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();

    return store.dispatch(Actions.programmes.getProgramme('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(
        Actions.programmes.getProgrammeIsLoading()
      );
    });
  });

  it('should call success action on success', () => {
    const programme = {
      name: 'Programme1'
    };
    mockHttpResponse({ status: 200, body: { data: programme } });

    const expectedActions = [
      Actions.programmes.getProgrammeIsLoading(),
      Actions.programmes.getProgrammeSuccess(programme)
    ];

    const store = createMockStore();

    return store.dispatch(Actions.programmes.getProgramme('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });

    const expectedActions = [
      Actions.programmes.getProgrammeIsLoading(),
      Actions.programmes.getProgrammeFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.programmes.getProgramme('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

describe('updateProgrammeIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.PUT_PROGRAMME
    };
    const action = Actions.programmes.updateProgrammeIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('updateProgrammeSuccess', () => {
  it('should create the correct action', () => {
    const testProgramme = {
      name: 'Programme1'
    };

    const expectedAction = {
      type: actionTypes.PUT_PROGRAMME_SUCCESS,
      programme: testProgramme
    };
    const action = Actions.programmes.updateProgrammeSuccess(testProgramme);
    expect(action).toEqual(expectedAction);
  });
});

describe('updateProgrammeFailure', () => {
  it('should update the correct action', () => {
    const expectedAction = {
      type: actionTypes.PUT_PROGRAMME_FAILURE
    };
    const action = Actions.programmes.updateProgrammeFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('updateProgramme', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();
    const data = { programme: { name: 'Test Programme' } };

    return store
      .dispatch(Actions.programmes.updateProgramme('1', data))
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions[0]).toEqual(
          Actions.programmes.updateProgrammeIsLoading()
        );
      });
  });

  it('should call success action on success', () => {
    const programme = {
      name: 'Programme1'
    };
    mockHttpResponse({ status: 200, body: { data: programme } });

    const expectedActions = [
      Actions.programmes.updateProgrammeIsLoading(),
      Actions.programmes.updateProgrammeSuccess(programme)
    ];

    const store = createMockStore();
    const data = { programme };

    return store
      .dispatch(Actions.programmes.updateProgramme('1', data))
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });
    const data = { programme: { name: 'Test Programme' } };

    const expectedActions = [
      Actions.programmes.updateProgrammeIsLoading(),
      Actions.programmes.updateProgrammeFailure()
    ];

    const store = createMockStore();

    return store
      .dispatch(Actions.programmes.updateProgramme('1', data))
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });
});

describe('deleteProgrammeIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.DELETE_PROGRAMME
    };
    const action = Actions.programmes.deleteProgrammeIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('deleteProgrammeSuccess', () => {
  it('should create the correct action', () => {
    const testProgrammeId = '1';

    const expectedAction = {
      type: actionTypes.DELETE_PROGRAMME_SUCCESS,
      id: testProgrammeId
    };
    const action = Actions.programmes.deleteProgrammeSuccess(testProgrammeId);
    expect(action).toEqual(expectedAction);
  });
});

describe('deleteProgrammeFailure', () => {
  it('should delete the correct action', () => {
    const expectedAction = {
      type: actionTypes.DELETE_PROGRAMME_FAILURE
    };
    const action = Actions.programmes.deleteProgrammeFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('deleteProgramme', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();

    return store.dispatch(Actions.programmes.deleteProgramme('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(
        Actions.programmes.deleteProgrammeIsLoading()
      );
    });
  });

  it('should call success action on success', () => {
    const programme = {
      id: '1'
    };
    mockHttpResponse({ status: 200, body: { data: programme.id } });

    const expectedActions = [
      Actions.programmes.deleteProgrammeIsLoading(),
      Actions.programmes.deleteProgrammeSuccess(programme.id)
    ];

    const store = createMockStore();

    return store.dispatch(Actions.programmes.deleteProgramme('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });
    const expectedActions = [
      Actions.programmes.deleteProgrammeIsLoading(),
      Actions.programmes.deleteProgrammeFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.programmes.deleteProgramme('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});
