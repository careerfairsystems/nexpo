import { Actions, actionTypes } from '../..';
import { mockHttpResponse, createMockStore } from '../../../TestHelper';

describe('getAllMailtemplatesIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_MAILTEMPLATES
    };
    const action = Actions.mailtemplates.getAllMailtemplatesIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('getAllMailtemplatesSuccess', () => {
  it('should create the correct action', () => {
    const testMailtemplates = [
      {
        name: 'Mailtemplate1'
      }
    ];

    const expectedAction = {
      type: actionTypes.FETCH_MAILTEMPLATES_SUCCESS,
      mailtemplates: testMailtemplates
    };
    const action = Actions.mailtemplates.getAllMailtemplatesSuccess(
      testMailtemplates
    );
    expect(action).toEqual(expectedAction);
  });
});

describe('getAllMailtemplatesFailure', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_MAILTEMPLATES_FAILURE
    };
    const action = Actions.mailtemplates.getAllMailtemplatesFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('getAllMailtemplates', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();

    return store
      .dispatch(Actions.mailtemplates.getAllMailtemplates())
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions[0]).toEqual(
          Actions.mailtemplates.getAllMailtemplatesIsLoading()
        );
      });
  });

  it('should call success action on success', () => {
    const mailtemplates = [
      {
        name: 'Mailtemplate1'
      }
    ];
    mockHttpResponse({ status: 200, body: { data: mailtemplates } });

    const expectedActions = [
      Actions.mailtemplates.getAllMailtemplatesIsLoading(),
      Actions.mailtemplates.getAllMailtemplatesSuccess(mailtemplates)
    ];

    const store = createMockStore();

    return store
      .dispatch(Actions.mailtemplates.getAllMailtemplates())
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });

    const expectedActions = [
      Actions.mailtemplates.getAllMailtemplatesIsLoading(),
      Actions.mailtemplates.getAllMailtemplatesFailure()
    ];

    const store = createMockStore();

    return store
      .dispatch(Actions.mailtemplates.getAllMailtemplates())
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });
});

describe('createMailtemplateIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.POST_MAILTEMPLATE
    };
    const action = Actions.mailtemplates.createMailtemplateIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('createMailtemplateSuccess', () => {
  it('should create the correct action', () => {
    const testMailtemplate = {
      name: 'Mailtemplate1'
    };

    const expectedAction = {
      type: actionTypes.POST_MAILTEMPLATE_SUCCESS,
      mailtemplate: testMailtemplate
    };
    const action = Actions.mailtemplates.createMailtemplateSuccess(
      testMailtemplate
    );
    expect(action).toEqual(expectedAction);
  });
});

describe('createMailtemplateFailure', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.POST_MAILTEMPLATE_FAILURE
    };
    const action = Actions.mailtemplates.createMailtemplateFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('createMailtemplate', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();
    const data = { mailtemplate: { name: 'Test Mailtemplate' } };

    return store
      .dispatch(Actions.mailtemplates.createMailtemplate(data))
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions[0]).toEqual(
          Actions.mailtemplates.createMailtemplateIsLoading()
        );
      });
  });

  it('should call success action on success', () => {
    const mailtemplate = {
      name: 'Mailtemplate1'
    };
    mockHttpResponse({ status: 200, body: { data: mailtemplate } });

    const expectedActions = [
      Actions.mailtemplates.createMailtemplateIsLoading(),
      Actions.mailtemplates.createMailtemplateSuccess(mailtemplate)
    ];

    const store = createMockStore();
    const data = { mailtemplate };

    return store
      .dispatch(Actions.mailtemplates.createMailtemplate(data))
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });
    const data = { mailtemplate: { name: 'Test Mailtemplate' } };

    const expectedActions = [
      Actions.mailtemplates.createMailtemplateIsLoading(),
      Actions.mailtemplates.createMailtemplateFailure()
    ];

    const store = createMockStore();

    return store
      .dispatch(Actions.mailtemplates.createMailtemplate(data))
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });
});

describe('getMailtemplateIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_MAILTEMPLATE
    };
    const action = Actions.mailtemplates.getMailtemplateIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('getMailtemplateSuccess', () => {
  it('should create the correct action', () => {
    const testMailtemplate = {
      name: 'Mailtemplate1'
    };

    const expectedAction = {
      type: actionTypes.FETCH_MAILTEMPLATE_SUCCESS,
      mailtemplate: testMailtemplate
    };
    const action = Actions.mailtemplates.getMailtemplateSuccess(
      testMailtemplate
    );
    expect(action).toEqual(expectedAction);
  });
});

describe('getMailtemplateFailure', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_MAILTEMPLATE_FAILURE
    };
    const action = Actions.mailtemplates.getMailtemplateFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('getMailtemplate', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();

    return store.dispatch(Actions.mailtemplates.getMailtemplate('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(
        Actions.mailtemplates.getMailtemplateIsLoading()
      );
    });
  });

  it('should call success action on success', () => {
    const mailtemplate = {
      name: 'Mailtemplate1'
    };
    mockHttpResponse({ status: 200, body: { data: mailtemplate } });

    const expectedActions = [
      Actions.mailtemplates.getMailtemplateIsLoading(),
      Actions.mailtemplates.getMailtemplateSuccess(mailtemplate)
    ];

    const store = createMockStore();

    return store.dispatch(Actions.mailtemplates.getMailtemplate('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });

    const expectedActions = [
      Actions.mailtemplates.getMailtemplateIsLoading(),
      Actions.mailtemplates.getMailtemplateFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.mailtemplates.getMailtemplate('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

describe('updateMailtemplateIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.PUT_MAILTEMPLATE
    };
    const action = Actions.mailtemplates.updateMailtemplateIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('updateMailtemplateSuccess', () => {
  it('should create the correct action', () => {
    const testMailtemplate = {
      name: 'Mailtemplate1'
    };

    const expectedAction = {
      type: actionTypes.PUT_MAILTEMPLATE_SUCCESS,
      mailtemplate: testMailtemplate
    };
    const action = Actions.mailtemplates.updateMailtemplateSuccess(
      testMailtemplate
    );
    expect(action).toEqual(expectedAction);
  });
});

describe('updateMailtemplateFailure', () => {
  it('should update the correct action', () => {
    const expectedAction = {
      type: actionTypes.PUT_MAILTEMPLATE_FAILURE
    };
    const action = Actions.mailtemplates.updateMailtemplateFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('updateMailtemplate', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();
    const data = { mailtemplate: { name: 'Test Mailtemplate' } };

    return store
      .dispatch(Actions.mailtemplates.updateMailtemplate('1', data))
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions[0]).toEqual(
          Actions.mailtemplates.updateMailtemplateIsLoading()
        );
      });
  });

  it('should call success action on success', () => {
    const mailtemplate = {
      name: 'Mailtemplate1'
    };
    mockHttpResponse({ status: 200, body: { data: mailtemplate } });

    const expectedActions = [
      Actions.mailtemplates.updateMailtemplateIsLoading(),
      Actions.mailtemplates.updateMailtemplateSuccess(mailtemplate)
    ];

    const store = createMockStore();
    const data = { mailtemplate };

    return store
      .dispatch(Actions.mailtemplates.updateMailtemplate('1', data))
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });
    const data = { mailtemplate: { name: 'Test Mailtemplate' } };

    const expectedActions = [
      Actions.mailtemplates.updateMailtemplateIsLoading(),
      Actions.mailtemplates.updateMailtemplateFailure()
    ];

    const store = createMockStore();

    return store
      .dispatch(Actions.mailtemplates.updateMailtemplate('1', data))
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });
});

describe('deleteMailtemplateIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.DELETE_MAILTEMPLATE
    };
    const action = Actions.mailtemplates.deleteMailtemplateIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('deleteMailtemplateSuccess', () => {
  it('should create the correct action', () => {
    const testMailtemplate = {
      id: '1',
      name: 'Mailtemplate1'
    };

    const expectedAction = {
      type: actionTypes.DELETE_MAILTEMPLATE_SUCCESS,
      id: testMailtemplate.id
    };
    const action = Actions.mailtemplates.deleteMailtemplateSuccess(
      testMailtemplate.id
    );
    expect(action).toEqual(expectedAction);
  });
});

describe('deleteMailtemplateFailure', () => {
  it('should delete the correct action', () => {
    const expectedAction = {
      type: actionTypes.DELETE_MAILTEMPLATE_FAILURE
    };
    const action = Actions.mailtemplates.deleteMailtemplateFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('deleteMailtemplate', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();

    return store
      .dispatch(Actions.mailtemplates.deleteMailtemplate('1'))
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions[0]).toEqual(
          Actions.mailtemplates.deleteMailtemplateIsLoading()
        );
      });
  });

  it('should call success action on success', () => {
    const mailtemplate = {
      id: '1',
      name: 'Mailtemplate1'
    };
    mockHttpResponse({ status: 200, body: { data: '' } });

    const expectedActions = [
      Actions.mailtemplates.deleteMailtemplateIsLoading(),
      Actions.mailtemplates.deleteMailtemplateSuccess(mailtemplate.id)
    ];

    const store = createMockStore();

    return store
      .dispatch(Actions.mailtemplates.deleteMailtemplate('1'))
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });
    const expectedActions = [
      Actions.mailtemplates.deleteMailtemplateIsLoading(),
      Actions.mailtemplates.deleteMailtemplateFailure()
    ];

    const store = createMockStore();

    return store
      .dispatch(Actions.mailtemplates.deleteMailtemplate('1'))
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });
});
